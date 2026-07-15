import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { LocationResponse } from '../../../common/types';
import LocationContainer from './LocationContainer';

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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
      }}
    >
      <LocationContainer loading={loading} currentLocation={currentLocation} />
    </Box>
  );
}
