import { Box, Typography } from '@mui/material';
import SignInComponent from '../components/sign-in/SignInComponent';
import { useWeatherSteamActionContext } from '../context/WeatherSteamContextProvider';
import { Navigate } from 'react-router-dom';

export default function SignInPage() {
  // const navigate = useNavigate();
  const { updateProfileAction, updateLibraryAction } =
    useWeatherSteamActionContext();

  const loadedProfile = localStorage.getItem('userProfile');
  const loadedLibrary = localStorage.getItem('userLibrary');

  if (loadedProfile !== null) {
    updateProfileAction(JSON.parse(loadedProfile));
  }

  if (loadedLibrary !== null) {
    updateLibraryAction(JSON.parse(loadedLibrary));
  }

  if (loadedProfile !== null) {
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
