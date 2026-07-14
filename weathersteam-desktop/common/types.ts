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

export interface SteamUserLibraryResponse {
  success: boolean;
  library?: SteamUserLibrary;
  error?: string;
}

export interface SteamUserLibrary {
  game_count: number;
  games: SteamGame[];
}

export interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  has_community_visible_stats: boolean;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
  rtime_last_played: Date;
  capsule_filename: string;
  has_workshop: boolean;
  has_market: boolean;
  has_dlc: boolean;
  content_descriptorids: number[];
  playtime_disconnected: number;
}

export interface LocationResponse {
  status: string;
  country?: string;
  countryCode?: string;
  regionName?: string;
  city?: string;
  lat?: number;
  lon?: number;
}

export interface WeatherSteamAPI {
  steamSignIn: () => Promise<SteamAuthResponse>;
  getSteamProfile: (steamId: string) => Promise<SteamProfileResponse>;
  getUserLibrary: (steamId: string) => Promise<SteamUserLibraryResponse>;
  getCurrentLocation: () => Promise<LocationResponse>;
  cancelSignIn: () => Promise<void>;
}
