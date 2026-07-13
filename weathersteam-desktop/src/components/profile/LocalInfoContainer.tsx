import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LocationResponse } from '../../../common/types';

export default function LocalInfoContainer() {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<LocationResponse>({
    status: 'fail'
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const currentLocationResponse =
        await window.weatherSteamApi.getCurrentLocation();
      setCurrentLocation(currentLocationResponse);
    };

    setLoading(true);
    fetchLocation();
    setLoading(false);
  }, []);

  const renderInfo = () => {
    if (loading) {
      return <CircularProgress color="inherit" aria-label="Loading…" />;
    } else {
      return (
        <>
          <Typography variant="h5" component="div">
            Country:{' '}
            {currentLocation.status === 'success'
              ? currentLocation.country
              : 'unknown'}
          </Typography>
          <Typography variant="h5" component="div">
            Region:{' '}
            {currentLocation.status === 'success'
              ? currentLocation.regionName
              : 'unknown'}
          </Typography>
          <Typography variant="h5" component="div">
            Location:{' '}
            {currentLocation.status === 'success'
              ? currentLocation.city
              : 'unknown'}
          </Typography>
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2
      }}
    >
      {renderInfo()}
    </Box>
  );
}
