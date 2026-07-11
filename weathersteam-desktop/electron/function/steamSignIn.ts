import { BrowserWindow, ipcMain, shell } from "electron";
import http from "node:http";
import { IpcChannel } from "../../common/ipcChannels";
import { SteamAuthResponse } from "../../common/types";
import requireEnv from "./requireEnv";

function restoreMainWindow(mainWindow: BrowserWindow | null): void {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.setAlwaysOnTop(true);
  mainWindow.show();
  mainWindow.focus();
  mainWindow.setAlwaysOnTop(false);
}

let activeServer: http.Server | null = null;
let pendingResolve: ((result: SteamAuthResponse) => void) | null = null;

function teardownServer(): void {
  if (activeServer && activeServer.listening) {
    activeServer.closeAllConnections();
    activeServer.close();
  }
  activeServer = null;
  ipcMain.removeAllListeners(IpcChannel.CANCEL_SIGN_IN);
}

export default function steamSignIn(
  mainWindow: BrowserWindow | null
): Promise<SteamAuthResponse> {
  if (pendingResolve) {
    pendingResolve({ success: false, error: "Sign in was restarted." });
    pendingResolve = null;
  }
  teardownServer();

  return new Promise<SteamAuthResponse>((resolve) => {
    let SIGN_IN_HOST: string;
    let SIGN_IN_PORT: number;
    let SERVER_TIMEOUT_MS: number;
    try {
      SIGN_IN_HOST = requireEnv("VITE_SIGN_IN_HOST");
      SIGN_IN_PORT = parseInt(requireEnv("VITE_SIGN_IN_PORT"), 10);
      SERVER_TIMEOUT_MS = parseInt(requireEnv("VITE_SIGN_IN_TIMEOUT"), 10);
    } catch (error) {
      resolve({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return;
    }

    pendingResolve = resolve;

    const RETURN_URL = `http://${SIGN_IN_HOST}:${SIGN_IN_PORT}/steam/callback`;
    const STEAM_OPENID_URL = "https://steamcommunity.com/openid/login";

    const authUrl = new URL(STEAM_OPENID_URL);
    authUrl.searchParams.set("openid.ns", "http://specs.openid.net/auth/2.0");
    authUrl.searchParams.set("openid.mode", "checkid_setup");
    authUrl.searchParams.set("openid.return_to", RETURN_URL);
    authUrl.searchParams.set("openid.realm", `http://${SIGN_IN_HOST}:${SIGN_IN_PORT}`);
    authUrl.searchParams.set(
      "openid.identity",
      "http://specs.openid.net/auth/2.0/identifier_select"
    );
    authUrl.searchParams.set(
      "openid.claimed_id",
      "http://specs.openid.net/auth/2.0/identifier_select"
    );

    const finish = (result: SteamAuthResponse) => {
      clearTimeout(timeoutHandle);
      teardownServer();
      if (pendingResolve) {
        pendingResolve(result);
        pendingResolve = null;
      }
    };

    ipcMain.once(IpcChannel.CANCEL_SIGN_IN, () => {
      finish({ success: false, error: "Sign in was cancelled by user." });
    });

    activeServer = http.createServer(async (req, res) => {
      if (!req.url || !req.url.startsWith("/steam/callback")) {
        res.writeHead(404);
        res.end();
        return;
      }

      const urlObj = new URL(`http://${SIGN_IN_HOST}:${SIGN_IN_PORT}${req.url}`);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<h1>Login Successful!</h1><p>You can close this tab and return to WeatherSteam.</p>"
      );

      if (urlObj.searchParams.get("openid.mode") === "cancel") {
        restoreMainWindow(mainWindow);
        finish({ success: false, error: "Sign in was cancelled." });
        return;
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
          const claimedId = urlObj.searchParams.get("openid.claimed_id") ?? "";
          const steamId = claimedId.replace(
            "https://steamcommunity.com/openid/id/",
            ""
          );

          if (!steamId) {
            finish({ success: false, error: "Steam did not return a valid ID." });
            return;
          }

          restoreMainWindow(mainWindow);
          finish({ success: true, steamId });
        } else {
          finish({ success: false, error: "Invalid signature from Steam." });
        }
      } catch {
        finish({ success: false, error: "Verification request failed." });
      }
    });

    activeServer.on("error", (err) => {
      finish({ success: false, error: `Server error: ${err.message}` });
    });

    activeServer.listen(SIGN_IN_PORT, () => {
      shell.openExternal(authUrl.href);
    });

    const timeoutHandle = setTimeout(() => {
      finish({ success: false, error: "Sign in timed out. Please try again." });
    }, SERVER_TIMEOUT_MS);
  });
}