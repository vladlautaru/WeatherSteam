import { Box } from '@mui/material';
import ProfilePictureContainer from './ProfilePictureContainer';
import LocalInfoContainer from './LocalInfoContainer';

export default function ProfileComponent() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly'}}>
      <ProfilePictureContainer />
      <LocalInfoContainer />
    </Box>
  );
}
