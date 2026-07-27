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

export interface WeatherRequest {
  latitude: number;
  longitude: number;
  current: string[];
  wind_speed_unit: 'kmh' | 'mph';
  temperature_unit: 'celsius' | 'fahrenheit';
  precipitation_unit: 'mm' | 'inch';
}

export interface WeatherResponse {
  temperature_2m: number;
  is_day: boolean;
  rain: number;
  wind_speed_10m: number;
  snowfall: number;
  cloud_cover: number;
}

export interface WeatherSteamAPI {
  steamSignIn: () => Promise<SteamAuthResponse>;
  getSteamProfile: (steamId: string) => Promise<SteamProfileResponse>;
  getUserLibrary: (steamId: string) => Promise<SteamUserLibraryResponse>;
  getCurrentLocation: () => Promise<LocationResponse>;
  getLocalWeather: (request: WeatherRequest) => Promise<WeatherResponse>;
  cancelSignIn: () => Promise<void>;
}
