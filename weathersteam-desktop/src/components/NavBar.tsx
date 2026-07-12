import { Box } from '@mui/material';
import PermanentDrawer from './PermanentDrawer';

export default function NavBar() {
  const drawerWidth: number = 300;
  return (
    <Box>
      <PermanentDrawer drawerWidth={drawerWidth} />
    </Box>
  );
}
