import { WeatherSteamAPI } from "../common/types";

declare global {
  interface Window {
    weatherSteamApi: WeatherSteamAPI;
  }
}