import { Avatar, Box, Typography } from '@mui/material';
import { useWeatherSteamStateContext } from '../../context/WeatherSteamContextProvider';
import CountryFlag from './CountryFlag';

export default function ProfilePictureContainer() {
  const { profile } = useWeatherSteamStateContext();

  const formatCreatedAt = () => {
    if (profile.timecreated === undefined) {
      return 'unknown';
    }

    const date = new Date(profile.timecreated * 1000);
    const locale = profile.loccountrycode
      ? new Intl.Locale('und', { region: profile.loccountrycode }).maximize()
      : undefined; // undefined -> runtime/OS default locale

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        gap: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt="user_profile_picture"
          src={profile.avatarfull}
          sx={{ width: 184, height: 184, border: 4, borderColor: 'divider' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          {profile.loccountrycode ? (
            <CountryFlag countryCode={profile.loccountrycode!} />
          ) : (
            <></>
          )}
          {profile.personaname}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6" component="div">
          Member since: {formatCreatedAt()}
        </Typography>
      </Box>
    </Box>
  );
}
