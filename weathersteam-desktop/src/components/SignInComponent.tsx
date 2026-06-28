import { CheckCircle } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function SignInComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [signInDisabled, setSignInDisabled] = useState<boolean>(false);
  const [signInComplete, setSignInComplete] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSignInClick = async () => {
    setLoading(true);
    setLoadingMessage("Routing to auth page...");

    await sleep(1000); // placeholder timeouts
    
    setLoadingMessage("Checking your profile...");
    
    await sleep(1000);

    setLoadingMessage("Fetching profile data...");

    await sleep(1000);

    setLoading(false);
    setSignInComplete(true);
    setSignInDisabled(true);
  };

  const renderSignInButton = () => {
    if (signInComplete) {
      return (
        <>
          <CheckCircle
            color="success"
            sx={{
              animation:
                "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
              "@keyframes popIn": {
                "0%": {
                  transform: "scale(0)",
                  opacity: 0,
                },
                "70%": {
                  transform: "scale(1.15)",
                  opacity: 1,
                },
                "100%": {
                  transform: "scale(1)",
                },
              },
            }}
          ></CheckCircle>
          <Typography>Sign in complete</Typography>
        </>
      );
    }

    if (!loading) {
      return (
        <>
          <Box
            className="spin-icon"
            component="img"
            src="https://steamcommunity.com/favicon.ico"
            sx={{
              width: 30,
              height: 30,
              transition: "transform 0.3s ease-in-out",
            }}
          ></Box>
          <Typography>Sign in through Steam</Typography>
        </>
      );
    }

    return <Typography> {loadingMessage} </Typography>;
  };

  return (
    <Box sx={{margin: 2, gap: 2}}>
      <Button
        variant="contained"
        disableRipple
        disabled={signInDisabled}
        loading={loading}
        loadingPosition="start"
        onClick={onSignInClick}
        sx={{
          width: "300px",
          height: "48px",
          alignItems: "center",
          gap: 2,
          transition: "transform 0.1s ease-in-out",
          "&:active": {
            transform: "scale(0.95)",
          },
          "&:hover .spin-icon": {
            transform: "rotate(360deg)",
          },
        }}
      >
        {renderSignInButton()}
      </Button>
    </Box>
  );
}
