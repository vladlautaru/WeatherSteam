import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { LocationResponse } from '../../../common/types';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function LocalInfoContainer() {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<LocationResponse>({
    status: 'fail'
  });

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    try {
      const currentLocationResponse =
        await window.weatherSteamApi.getCurrentLocation();
      setCurrentLocation(currentLocationResponse);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const renderInfo = () => {
    if (loading) {
      return <CircularProgress color="inherit" aria-label="Loading…" />;
    } else {
      return (
        <>
          <Typography variant="h6" component="div">
            Country:{' '}
            {currentLocation.status === 'success'
              ? currentLocation.country
              : 'unknown'}
          </Typography>
          <Typography variant="h6" component="div">
            Region:{' '}
            {currentLocation.status === 'success'
              ? currentLocation.regionName
              : 'unknown'}
          </Typography>
          <Typography variant="h6" component="div">
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
      <Button
        color="secondary"
        variant="contained"
        startIcon={<RefreshIcon />}
        disableRipple={true}
        loading={loading}
        onClick={fetchLocation}
      >
        Refresh
      </Button>
    </Box>
  );
}
