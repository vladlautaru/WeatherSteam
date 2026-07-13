import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap
} from '@mui/material';
import { NavButtonIndex } from './NavBar';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface DrawerButtonProps {
  label: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  index: NavButtonIndex;
  selectedElement: NavButtonIndex;
  handleNavButtonClick: (buttonIndex: NavButtonIndex) => void;
}

export default function DrawerButton(props: DrawerButtonProps) {
  return (
    <>
      <ListItemButton
        disableRipple={true}
        onClick={() => props.handleNavButtonClick(props.index)}
        sx={
          props.selectedElement === props.index
            ? {
                backgroundColor: 'primary.light',
                ':hover': { backgroundColor: 'primary.light' }
              }
            : { ':hover': { backgroundColor: 'primary.light' } }
        }
      >
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </>
  );
}
