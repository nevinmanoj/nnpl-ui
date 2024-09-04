import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { UserContext } from "../../context/userProvider";

export const NotficationToast = () => {
  const { message, setMessage, severity } = useContext(UserContext);
  const open = message != null;

  const handleClose = () => {
    setMessage(null);
  };

  return (
    <Box sx={{ width: 80 }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={message}
        TransitionComponent={Slide}
        key={message}
        // autoHideDuration={5000}
      >
        <Alert
          sx={{
            width: "300px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            fontSize: " 1.1em",
          }}
          onClose={handleClose}
          severity={severity}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
