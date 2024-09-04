import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../context/userProvider";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const LoginModal = () => {
  const [val, setval] = useState(null);
  const [err, seterr] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const { login, token } = useContext(UserContext);

  const [open, setOpen] = useState(token == null);
  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "40vw" }}>
          <Typography
            sx={{
              //   backgroundColor: "red",
              marginBottom: "20px",
              textAlign: "center",
            }}
            variant="h5"
            noWrap
          >
            Pass Key Login
          </Typography>
          <TextField
            label="Pass Key"
            placeholder="Enter Pass Key"
            sx={{ width: "80%" }}
            onChange={(e) => {
              setval(e.target.value);
            }}
            value={val}
            variant="outlined"
            size="small"
          />
          <Button
            sx={{ marginLeft: "10px" }}
            variant="outlined"
            onClick={async () => {
              const res = await login(val);
              if (res) {
                setOpen(false);
                seterr(false);
              } else {
                seterr(true);
              }
            }}
          >
            Login
          </Button>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "18px",
              fontFamily: "sans-serif",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {err && "Invalid Credentials"}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
