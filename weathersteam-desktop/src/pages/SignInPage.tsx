import { Box, Typography } from '@mui/material';
import SignInComponent from '../components/sign-in/SignInComponent';
import { useWeatherSteamStateContext } from '../context/WeatherSteamContextProvider';
import { Navigate } from 'react-router-dom';

export default function SignInPage() {
  const { profile } = useWeatherSteamStateContext();

  if (profile !== null) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography variant="h2">WeatherSteam</Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          By gamers. For gamers
        </Typography>
        <SignInComponent></SignInComponent>
      </Box>
    </Box>
  );
}
