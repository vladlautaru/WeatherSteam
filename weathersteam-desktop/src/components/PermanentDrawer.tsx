import {
  Drawer,
  Divider,
  List,
  ListItem,
  Box,
  Typography
} from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SettingsIcon from '@mui/icons-material/Settings';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerButton from './DrawerButton';
import { useNavigate } from 'react-router-dom';

interface PermanentDrawerProps {
  drawerWidth: number;
  selectedElement: NavButtonIndex;
  setSelectedElement: React.Dispatch<React.SetStateAction<NavButtonIndex>>;
}

enum NavButtonIndex {
  PROFILE_BUTTON_INDEX = 1,
  LIBRARY_BUTTON_INDEX = 2,
  WEATHER_BUTTON_INDEX = 3,
  RANDOM_BUTTON_INDEX = 4,
  SETTINGS_BUTTON_INDEX = 5
}

export default function PermanentDrawer(props: PermanentDrawerProps) {
  const navigate = useNavigate();

  const handleNavButtonClick = (buttonIndex: NavButtonIndex) => {

    props.setSelectedElement(buttonIndex);

    switch (buttonIndex) {
      case NavButtonIndex.PROFILE_BUTTON_INDEX:
        navigate('/profile');
        break;
      case NavButtonIndex.LIBRARY_BUTTON_INDEX:
        navigate('/library');
        break;
      case NavButtonIndex.WEATHER_BUTTON_INDEX:
        navigate('/weather');
        break;
      case NavButtonIndex.RANDOM_BUTTON_INDEX:
        navigate('/random');
        break;
      case NavButtonIndex.SETTINGS_BUTTON_INDEX:
        navigate('/settings');
        break;
    }
  };

  return (
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
            <DrawerButton
              label="Profile"
              icon={AccountCircleIcon}
              index={NavButtonIndex.PROFILE_BUTTON_INDEX}
              selectedElement={props.selectedElement}
              handleNavButtonClick={handleNavButtonClick}
            />
          </ListItem>
          <ListItem key="My Library" disablePadding>
            <DrawerButton
              label="My Library"
              icon={VideogameAssetIcon}
              index={NavButtonIndex.LIBRARY_BUTTON_INDEX}
              selectedElement={props.selectedElement}
              handleNavButtonClick={handleNavButtonClick}
            />
          </ListItem>
          <ListItem key="Weather Choice" disablePadding>
            <DrawerButton
              label="Weather Choice"
              icon={ThunderstormIcon}
              index={NavButtonIndex.WEATHER_BUTTON_INDEX}
              selectedElement={props.selectedElement}
              handleNavButtonClick={handleNavButtonClick}
            />
          </ListItem>
          <ListItem key="Random Choice" disablePadding>
            <DrawerButton
              label="Random Choice"
              icon={QuestionMarkIcon}
              index={NavButtonIndex.RANDOM_BUTTON_INDEX}
              selectedElement={props.selectedElement}
              handleNavButtonClick={handleNavButtonClick}
            />
          </ListItem>
        </List>
        <Divider />
      </Box>
      <Box>
        <Divider />
        <List>
          <ListItem key="Settings" disablePadding>
            <DrawerButton
              label="Settings"
              icon={SettingsIcon}
              index={NavButtonIndex.SETTINGS_BUTTON_INDEX}
              selectedElement={props.selectedElement}
              handleNavButtonClick={handleNavButtonClick}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
