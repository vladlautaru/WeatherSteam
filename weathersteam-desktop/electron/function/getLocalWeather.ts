import { WeatherRequest, WeatherResponse } from '../../common/types';
import { fetchWeatherApi } from 'openmeteo';

export default async function getLocalWeather(request: WeatherRequest) {
  const params = {
    latitude: request.latitude,
    longitude: request.longitude,
    current: request.current,
    wind_speed_unit: request.wind_speed_unit,
    temperature_unit: request.temperature_unit,
    precipitation_unit: request.precipitation_unit
  };

  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  const current = response.current()!;

  const weatherData: WeatherResponse = {
    temperature_2m: current.variables(0)!.value(),
    is_day: current.variables(1)!.value() === 1 ? true : false,
    rain: current.variables(2)!.value(),
    wind_speed_10m: current.variables(3)!.value(),
    snowfall: current.variables(4)!.value(),
    cloud_cover: current.variables(5)!.value()
  };

  return weatherData;
}
