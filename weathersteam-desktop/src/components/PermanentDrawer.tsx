import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography
} from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SettingsIcon from '@mui/icons-material/Settings';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface PermanentDrawerProps {
  drawerWidth: number;
}

export default function PermanentDrawer(props: PermanentDrawerProps) {
  return (
    <Box>
      <Drawer
        sx={{
          width: props.drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            display: 'flex',
            justifyContent: 'space-between',
            width: props.drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 1 }}>
            <Typography variant="h4" component="div">
              Weather Steam
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem key="Profile" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem key="My Library" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <VideogameAssetIcon />
                </ListItemIcon>
                <ListItemText primary="My Library" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Weather Choice" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ThunderstormIcon />
                </ListItemIcon>
                <ListItemText primary="Weather Choice" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Random Choice" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <QuestionMarkIcon />
                </ListItemIcon>
                <ListItemText primary="Random Choice" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Box>
          <Divider />
          <List>
            <ListItem key="Settings" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
