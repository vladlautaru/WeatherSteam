import { CheckCircle } from '@mui/icons-material';
import {
  AlertColor,
  AlertPropsColorOverrides,
  Box,
  Button,
  Typography
} from '@mui/material';
import { useState } from 'react';
import {
  SteamAuthResponse,
  SteamProfile,
  SteamProfileResponse,
  SteamUserLibrary,
  SteamUserLibraryResponse
} from '../../common/types';
import { OverridableStringUnion } from '@mui/types';
import CustomSnackbar from './CustomSnackbar';
import { useNavigate } from 'react-router-dom';
import { useWeatherSteamActionContext } from '../context/WeatherSteamContextProvider';

export default function SignInComponent() {
  const navigate = useNavigate();
  const { updateProfileAction, updateLibraryAction } =
    useWeatherSteamActionContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [signInDisabled, setSignInDisabled] = useState<boolean>(false);
  const [signInComplete, setSignInComplete] = useState<boolean>(false);
  const [snackbarShow, setSnackbarShow] = useState<boolean>(false);

  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState<
    OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined
  >(undefined);

  const handleSnackBarClose = () => {
    setSnackbarShow(false);
    setSnackbarMessage('');
    setSnackbarAlertSeverity(undefined);
  };

  const handleSteamSignIn = async (): Promise<SteamAuthResponse> => {
    const result = await window.weatherSteamApi.steamSignIn();

    if (result.success && result.steamId) {
      return { success: true, steamId: result.steamId };
    } else {
      return { success: false, error: result.error || 'Something went wrong' };
    }
  };

  const handleGetSteamProfile = async (
    steamId: string
  ): Promise<SteamProfileResponse> => {
    const result = await window.weatherSteamApi.getSteamProfile(steamId);

    if (result.success && result.profile) {
      return { success: true, profile: result.profile };
    } else {
      return { success: false, error: result.error || 'Something went wrong' };
    }
  };

  const handleGetUserLibrary = async (
    steamId: string
  ): Promise<SteamUserLibraryResponse> => {
    const result = await window.weatherSteamApi.getUserLibrary(steamId);

    if (result.success && result.library) {
      return { success: true, library: result.library };
    } else {
      return { success: false, error: result.error || 'Something went wrong' };
    }
  };

  const onSignInClick = async () => {
    setLoading(true);
    setLoadingMessage('Routing to auth page...');

    const signInResponse: SteamAuthResponse = await handleSteamSignIn();

    if (
      !signInResponse.success &&
      signInResponse.error?.includes('cancelled')
    ) {
      return;
    }

    if (!signInResponse.success || signInResponse.steamId === undefined) {
      setSnackbarMessage(signInResponse.error || 'Something went wrong.');
      setSnackbarAlertSeverity('error');
      setSnackbarShow(true);
      setLoading(false);
      return;
    }

    const userSteamId: string = signInResponse.steamId;

    setLoadingMessage('Fetching profile...');

    const profileResponse: SteamProfileResponse =
      await handleGetSteamProfile(userSteamId);

    if (!profileResponse.success || profileResponse.profile === undefined) {
      setSnackbarMessage(signInResponse.error || 'Something went wrong.');
      setSnackbarAlertSeverity('error');
      setSnackbarShow(true);
      setLoading(false);
      return;
    }

    const userProfile: SteamProfile = profileResponse.profile;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    updateProfileAction(userProfile);

    setLoadingMessage('Fetching library...');

    const userLibraryResponse: SteamUserLibraryResponse =
      await handleGetUserLibrary(userSteamId);

    if (
      !userLibraryResponse.success ||
      userLibraryResponse.library === undefined
    ) {
      setSnackbarMessage(signInResponse.error || 'Something went wrong.');
      setSnackbarAlertSeverity('error');
      setSnackbarShow(true);
      setLoading(false);
      return;
    }

    const userLibrary: SteamUserLibrary = userLibraryResponse.library;
    localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
    updateLibraryAction(userLibrary);

    setLoading(false);
    setSignInComplete(true);
    setSignInDisabled(true);

    navigate('/profile');
  };

  const onCancelSignIn = async () => {
    await window.weatherSteamApi.cancelSignIn();
    setSnackbarMessage('Sign in cancelled by user.');
    setSnackbarAlertSeverity('info');
    setSnackbarShow(true);
    setLoading(false);
  };

  const renderSignInButton = () => {
    if (signInComplete) {
      return (
        <>
          <CheckCircle
            color="success"
            sx={{
              animation:
                'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
              '@keyframes popIn': {
                '0%': {
                  transform: 'scale(0)',
                  opacity: 0
                },
                '70%': {
                  transform: 'scale(1.15)',
                  opacity: 1
                },
                '100%': {
                  transform: 'scale(1)'
                }
              }
            }}
          ></CheckCircle>
          <Typography>Sign in complete</Typography>
        </>
      );
    }

    if (!loading) {
      return (
        <>
          <Box
            className="spin-icon"
            component="img"
            src="https://steamcommunity.com/favicon.ico"
            sx={{
              width: 30,
              height: 30,
              transition: 'transform 0.3s ease-in-out'
            }}
          ></Box>
          <Typography>Sign in through Steam</Typography>
        </>
      );
    }

    return <Typography> {loadingMessage} </Typography>;
  };

  return (
    <Box sx={{ margin: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>
      <CustomSnackbar
        show={snackbarShow}
        message={snackbarMessage}
        severity={snackbarAlertSeverity}
        handleClose={handleSnackBarClose}
      />
      <Button
        variant="contained"
        disableRipple
        disabled={signInDisabled}
        loading={loading}
        loadingPosition="start"
        onClick={onSignInClick}
        sx={{
          width: '300px',
          height: '48px',
          alignItems: 'center',
          gap: 2,
          transition: 'transform 0.1s ease-in-out',
          '&:active': {
            transform: 'scale(0.95)'
          },
          '&:hover .spin-icon': {
            transform: 'rotate(360deg)'
          }
        }}
      >
        {renderSignInButton()}
      </Button>
      {loading ? (
        <Button
          variant="contained"
          disableRipple
          color="error"
          onClick={onCancelSignIn}
          sx={{
            transition: 'transform 0.1s ease-in-out',
            '&:active': {
              transform: 'scale(0.95)'
            }
          }}
        >
          Cancel
        </Button>
      ) : (
        ''
      )}
    </Box>
  );
}
