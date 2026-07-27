import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { WeatherRequest } from '../../../common/types';
import LocationContainer from './LocationContainer';
import WeatherContainer from './WeatherContainer';
import { useWeatherSteamActionContext } from '../../context/WeatherSteamContextProvider';

export default function LocalInfoContainer() {
  const [loading, setLoading] = useState<boolean>(false);

  const { updateLocationAction, updateWeatherAction } =
    useWeatherSteamActionContext();

  const fetchLocationAndWeather = useCallback(async () => {
    setLoading(true);
    try {
      const currentLocationResponse =
        await window.weatherSteamApi.getCurrentLocation();
      updateLocationAction(currentLocationResponse);

      if (currentLocationResponse.status !== 'fail') {
        const localWeatherRequest: WeatherRequest = {
          latitude: currentLocationResponse.lat!,
          longitude: currentLocationResponse.lon!,
          current: [
            'temperature_2m',
            'is_day',
            'rain',
            'wind_speed_10m',
            'snowfall',
            'cloud_cover'
          ],
          wind_speed_unit: 'kmh',
          temperature_unit: 'celsius',
          precipitation_unit: 'mm'
        };

        const localWeatherResponse =
          await window.weatherSteamApi.getLocalWeather(localWeatherRequest);
        updateWeatherAction(localWeatherResponse);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocationAndWeather();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 2
      }}
    >
      <LocationContainer loading={loading} />
      <WeatherContainer loading={loading} />
    </Box>
  );
}
