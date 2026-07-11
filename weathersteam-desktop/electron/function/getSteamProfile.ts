import { SteamProfile, SteamProfileResponse } from "../../common/types";
import requireEnv from "./requireEnv";

export default async function getSteamProfile(
  steamId: string,
): Promise<SteamProfileResponse> {
  const steamApiKey: string = requireEnv("VITE_STEAM_API_KEY");

  const requestUrl: string = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${steamApiKey}&steamids=${steamId}`;

  try {
    const response: SteamProfile | undefined = await fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => data.response?.players?.[0] as SteamProfile)
      .catch((e) => {
        return undefined;
      });

    if (response === undefined) {
      return {
        success: false,
        error: "Couldn't fetch profile.",
      };
    }

    return { success: true, profile: response };
  } catch (e) {
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
}
