import { ipcRenderer, contextBridge } from "electron";
import { IpcChannel } from "../common/ipcChannels";

contextBridge.exposeInMainWorld("weatherSteamApi", {
  steamSignIn: () => ipcRenderer.invoke(IpcChannel.STEAM_SIGN_IN),
  cancelSignIn: () => ipcRenderer.send(IpcChannel.CANCEL_SIGN_IN),
});
