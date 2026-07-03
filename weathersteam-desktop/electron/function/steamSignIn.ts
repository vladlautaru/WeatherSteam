import { BrowserWindow, ipcMain, shell } from "electron";
import http from "node:http";
import { IpcChannel } from "../../common/ipcChannels";

let activeServer: http.Server | null = null;

export default async function steamSignIn(mainWindow: BrowserWindow | null) {
  if (activeServer && activeServer.listening) {
    activeServer.closeAllConnections();
    activeServer.close();
    activeServer = null;
  }

  return new Promise((resolve, _) => {
    const SIGN_IN_HOST = process.env.VITE_SIGN_IN_HOST;
    const SIGN_IN_PORT = parseInt(process.env.VITE_SIGN_IN_PORT);
    const SERVER_TIMEOUT_MS = parseInt(process.env.VITE_SIGN_IN_TIMEOUT);

    const RETURN_URL = `http://${SIGN_IN_HOST}:${SIGN_IN_PORT}/steam/callback`;
    const STEAM_OPENID_URL = "https://steamcommunity.com/openid/login";

    const authUrl = new URL(STEAM_OPENID_URL);
    authUrl.searchParams.set("openid.ns", "http://specs.openid.net/auth/2.0");
    authUrl.searchParams.set("openid.mode", "checkid_setup");
    authUrl.searchParams.set("openid.return_to", RETURN_URL);
    authUrl.searchParams.set("openid.realm", `http://${SIGN_IN_HOST}:${SIGN_IN_PORT}`);
    authUrl.searchParams.set(
      "openid.identity",
      "http://specs.openid.net/auth/2.0/identifier_select",
    );
    authUrl.searchParams.set(
      "openid.claimed_id",
      "http://specs.openid.net/auth/2.0/identifier_select",
    );

    ipcMain.once(IpcChannel.CANCEL_SIGN_IN, () => {
      if (activeServer && activeServer.listening) {
        activeServer.closeAllConnections();
        activeServer.close();
        activeServer = null;
      }
      resolve({ success: false, error: "Sign in was cancelled by user." });
    });

    activeServer = http.createServer(async (req, res) => {
      if (req.url && req.url.startsWith("/steam/callback")) {
        const urlObj = new URL(`http://${SIGN_IN_HOST}:${SIGN_IN_PORT}${req.url}`);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          "<h1>Login Successful!</h1><p>You can close this tab and return to WeatherSteam.</p>",
        );

        if (activeServer && activeServer.listening) {
          activeServer.closeAllConnections();
          activeServer.close();
          activeServer = null;
        }

        ipcMain.removeAllListeners(IpcChannel.CANCEL_SIGN_IN);

        if (urlObj.searchParams.get("openid.mode") === "cancel") {
          if (mainWindow) {
            mainWindow.setAlwaysOnTop(true);
            mainWindow.show();
            mainWindow.focus();
            mainWindow.setAlwaysOnTop(false);
          }
          return resolve({ success: false, error: "Sign in was cancelled." });
        }

        const verifyParams = new URLSearchParams(urlObj.searchParams);
        verifyParams.set("openid.mode", "check_authentication");

        try {
          const verifyRes = await fetch(STEAM_OPENID_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: verifyParams.toString(),
          });

          const text = await verifyRes.text();

          if (text.includes("is_valid:true")) {
            const claimedId =
              urlObj.searchParams.get("openid.claimed_id") || "";
            const steamId = claimedId.replace(
              "https://steamcommunity.com/openid/id/",
              "",
            );

            if (mainWindow) {
              if (mainWindow.isMinimized()) {
                mainWindow.restore();
              }

              mainWindow.setAlwaysOnTop(true);
              mainWindow.show();
              mainWindow.focus();
              mainWindow.setAlwaysOnTop(false);
            }

            resolve({ success: true, steamId });
          } else {
            resolve({ success: false, error: "Invalid signature from Steam." });
          }
        } catch (err) {
          resolve({ success: false, error: "Verification request failed." });
        }
      }
    });

    activeServer.listen(SIGN_IN_PORT, () => {
      shell.openExternal(authUrl.href);
    });

    setTimeout(() => {
      if (activeServer && activeServer.listening) {
        activeServer.closeAllConnections();
        activeServer.close();
        activeServer = null;
        ipcMain.removeAllListeners(IpcChannel.CANCEL_SIGN_IN);
        resolve({
          success: false,
          error: "Sign in timed out. Please try again.",
        });
      }
    }, SERVER_TIMEOUT_MS);
  });
}
