export interface SteamAuthResponse {
  success: boolean;
  steamId?: string;
  error?: string;
}

export interface WeatherSteamAPI {
  steamSignIn: () => Promise<SteamAuthResponse>;
  cancelSignIn: () => Promise<void>;
}