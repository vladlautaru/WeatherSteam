export interface SteamAuthResponse {
  success: boolean;
  steamId?: string;
  error?: string;
}

export interface SteamProfileResponse {
  success: boolean;
  profile?: SteamProfile;
  error?: string;
}

export interface SteamProfile {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  communityvisibilitystate: number;
  lastlogoff?: number;
  timecreated?: number;
  loccountrycode?: string;
}

export interface WeatherSteamAPI {
  steamSignIn: () => Promise<SteamAuthResponse>;
  getSteamProfile: (steamId: string) => Promise<SteamProfileResponse>;
  cancelSignIn: () => Promise<void>;
}
