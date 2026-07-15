import { Typography, Skeleton } from '@mui/material';
import { LocationResponse } from '../../../common/types';
import CountryFlag from './CountryFlag';
import LocationPinIcon from '@mui/icons-material/LocationPin';

interface LocationContainerProps {
  loading: boolean;
  currentLocation: LocationResponse;
}

export default function LocationContainer(props: LocationContainerProps) {
  if (props.loading) {
    return (
      <Typography variant="h6">
        <Skeleton width={400}></Skeleton>
      </Typography>
    );
  } else {
    return (
      <>
        <Typography
          variant="h6"
          component="div"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <LocationPinIcon />
          Location:{' '}
          {props.currentLocation.status === 'success' ? (
            <>
              {props.currentLocation.regionName}
              {', '}
              {props.currentLocation.city}
              {', '}
              {props.currentLocation.countryCode && (
                <CountryFlag countryCode={props.currentLocation.countryCode} />
              )}
              {props.currentLocation.country}
            </>
          ) : (
            'unknown'
          )}
        </Typography>
      </>
    );
  }
}
