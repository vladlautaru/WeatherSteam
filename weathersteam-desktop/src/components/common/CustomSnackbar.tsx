import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Slide,
  Snackbar,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

interface CustomSnackbarProps {
  show: boolean;
  message: string;
  severity:
    OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined;
  handleClose: () => void;
}

export default function CustomSnackbar(props: CustomSnackbarProps) {
  return (
    <Snackbar
      open={props.show}
      onClose={props.handleClose}
      slots={{ transition: Slide }}
      key={Slide.name}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <Alert
        onClose={props.handleClose}
        severity={props.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
