import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
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
    <Box sx={{ width: 600 }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleClose}
        message={message}
        TransitionComponent={Fade.name}
        key={message}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
