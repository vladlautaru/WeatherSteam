import { createTheme } from "@mui/material/styles";

export const weatherSteamTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2A475E",
      light: "#3D5A72",
      dark: "#1B2838",
    },
    secondary: {
      main: "#66C0F4",
      light: "#94D6F7",
      dark: "#3D91CB",
    },
    background: {
      default: "#171A21",
      paper: "#212B3B",
    },
    text: {
      primary: "#C7D5E0",
      secondary: "#93A9C1",
      disabled: "#6A86A1",
    },
    divider: "#3A4B62",
    success: {
      main: "#54A234",
    },
    warning: {
      main: "#E49733",
    },
    error: {
      main: "#E44D44",
    },
    info: {
      main: "#673AB7",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  }
});
