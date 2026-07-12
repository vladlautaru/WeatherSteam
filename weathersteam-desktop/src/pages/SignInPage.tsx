import { Box, Typography } from "@mui/material";
import SignInComponent from "../components/SignInComponent";

export default function SignInPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h2">WeatherSteam</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          By gamers. For gamers
        </Typography>
        <SignInComponent></SignInComponent>
      </Box>
    </Box>
  );
}
