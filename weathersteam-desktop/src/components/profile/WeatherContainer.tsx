import { Box, Grid, Skeleton, Typography } from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import LightModeIcon from '@mui/icons-material/LightMode';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import WeatherGridItem from './WeatherGridItem';
import { useWeatherSteamStateContext } from '../../context/WeatherSteamContextProvider';

interface WeatherContainerProps {
  loading: boolean;
}

export default function WeatherContainer(props: WeatherContainerProps) {
  if (props.loading) {
    return (
      <>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(6)).map(() => (
            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4">
                  <Skeleton width={150} />
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </>
    );
  } else {
    const { weather } = useWeatherSteamStateContext();

    return (
      <>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <WeatherGridItem
              icon={DeviceThermostatIcon}
              tooltipLabel={'Temperature'}
              value={Math.round(weather.temperature_2m)}
              measureUnit={'celsius'}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <WeatherGridItem
              icon={LightModeIcon}
              tooltipLabel={'Day/Night'}
              value={weather.is_day ? 'Day' : 'Night'}
              measureUnit={''}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <WeatherGridItem
              icon={WaterDropIcon}
              tooltipLabel={'Rain'}
              value={Math.floor(weather.rain).toFixed(2)}
              measureUnit={'mm'}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <WeatherGridItem
              icon={AirIcon}
              tooltipLabel={'Wind speed'}
              value={Math.floor(weather.wind_speed_10m).toFixed(2)}
              measureUnit={'kmh'}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <WeatherGridItem
              icon={AcUnitIcon}
              tooltipLabel={'Snowfall'}
              value={Math.floor(weather.snowfall).toFixed(2)}
              measureUnit={'mm'}
            />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <WeatherGridItem
              icon={WbCloudyIcon}
              tooltipLabel={'Cloud coverage'}
              value={Math.floor(weather.cloud_cover).toFixed(2)}
              measureUnit={'%'}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
