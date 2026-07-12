import PermanentDrawer from './PermanentDrawer';
import { useState } from 'react';

export enum NavButtonIndex {
  PROFILE_BUTTON_INDEX = 1,
  LIBRARY_BUTTON_INDEX = 2,
  WEATHER_BUTTON_INDEX = 3,
  RANDOM_BUTTON_INDEX = 4,
  SETTINGS_BUTTON_INDEX = 5
}

export default function NavBar() {
  const drawerWidth: number = 300;
  const [selectedElement, setSelectedElement] = useState<NavButtonIndex>(
    NavButtonIndex.LIBRARY_BUTTON_INDEX
  );

  return (
    <PermanentDrawer
      drawerWidth={drawerWidth}
      selectedElement={selectedElement}
      setSelectedElement={setSelectedElement}
    />
  );
}
