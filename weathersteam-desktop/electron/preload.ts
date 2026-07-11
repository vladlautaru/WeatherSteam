import { ipcRenderer, contextBridge } from "electron";
import { IpcChannel } from "../common/ipcChannels";

contextBridge.exposeInMainWorld("weatherSteamApi", {
  steamSignIn: () => ipcRenderer.invoke(IpcChannel.STEAM_SIGN_IN),
  getSteamProfile: (steamId: string) =>
    ipcRenderer.invoke(IpcChannel.GET_STEAM_PROFILE, steamId),
  getUserLibrary: (steamId: string) =>
    ipcRenderer.invoke(IpcChannel.GET_USER_LIBRARY, steamId),
  cancelSignIn: () => ipcRenderer.send(IpcChannel.CANCEL_SIGN_IN),
});
