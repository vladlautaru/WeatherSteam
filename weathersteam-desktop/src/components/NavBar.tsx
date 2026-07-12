import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
} from "@mui/material";
import PermanentDrawer from "./PermanentDrawer";

export default function NavBar() {
  const drawerWidth: number = 300;
  const appappBarHeight: number = 48;
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar variant="dense">
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: "inherit",
            }}
          >
            Weather Steam
          </Typography>
        </Toolbar>
      </AppBar>
      <PermanentDrawer
        drawerWidth={drawerWidth}
        appBarHeight={appappBarHeight}
      />
    </Box>
  );
}
