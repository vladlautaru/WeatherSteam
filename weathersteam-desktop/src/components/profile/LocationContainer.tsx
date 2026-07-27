import { Typography, Skeleton } from '@mui/material';
import CountryFlag from './CountryFlag';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { useWeatherSteamStateContext } from '../../context/WeatherSteamContextProvider';

interface LocationContainerProps {
  loading: boolean;
}

export default function LocationContainer(props: LocationContainerProps) {
  if (props.loading) {
    return (
      <Typography variant="h5">
        <Skeleton width={400}></Skeleton>
      </Typography>
    );
  } else {
    const { location } = useWeatherSteamStateContext();

    return (
      <>
        <Typography
          variant="h5"
          component="div"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <LocationPinIcon />
          Location:{' '}
          {location.status === 'success' ? (
            <>
              {location.regionName}
              {', '}
              {location.city}
              {', '}
              {location.countryCode && (
                <CountryFlag countryCode={location.countryCode} />
              )}
              {location.country}
            </>
          ) : (
            'unknown'
          )}
        </Typography>
      </>
    );
  }
}
