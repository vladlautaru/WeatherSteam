import { ipcRenderer, contextBridge } from 'electron';
import { IpcChannel } from '../common/ipcChannels';
import { WeatherRequest, WeatherResponse } from '../common/types';

contextBridge.exposeInMainWorld('weatherSteamApi', {
  steamSignIn: () => ipcRenderer.invoke(IpcChannel.STEAM_SIGN_IN),
  getSteamProfile: (steamId: string) =>
    ipcRenderer.invoke(IpcChannel.GET_STEAM_PROFILE, steamId),
  getUserLibrary: (steamId: string) =>
    ipcRenderer.invoke(IpcChannel.GET_USER_LIBRARY, steamId),
  getLocalWeather: (request: WeatherRequest): Promise<WeatherResponse> =>
    ipcRenderer.invoke(IpcChannel.GET_LOCAL_WEATHER, request),
  getCurrentLocation: () => ipcRenderer.invoke(IpcChannel.GET_CURRENT_LOCATION),
  cancelSignIn: () => ipcRenderer.send(IpcChannel.CANCEL_SIGN_IN)
});
