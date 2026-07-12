import { SteamUserLibrary, SteamUserLibraryResponse } from "../../common/types";
import requireEnv from "./requireEnv";

export default async function getUserLibrary(
  steamId: string,
): Promise<SteamUserLibraryResponse> {
  const steamApiKey: string = requireEnv("VITE_STEAM_API_KEY");

  const requestUrl: string = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${steamApiKey}&steamid=${steamId}&include_appinfo=true&include_extended_appinfo=true`;

  try {
    const response: SteamUserLibrary | undefined = await fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => data.response as SteamUserLibrary)
      .catch((_e) => {
        return undefined;
      });

    if (response === undefined) {
      return {
        success: false,
        error: "Couldn't fetch library.",
      };
    }

    return { success: true, library: response };
  } catch (e) {
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
}
