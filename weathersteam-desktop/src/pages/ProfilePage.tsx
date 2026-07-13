import { useWeatherSteamStateContext } from '../context/WeatherSteamContextProvider';

export default function ProfilePage() {
  const { profile } = useWeatherSteamStateContext();

  return <>Welcome, {profile.personaname}</>;
}
