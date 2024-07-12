import ErrorIcon from "@mui/icons-material/Error";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import "./errorMessage.scss";
export const ErrorMessage = () => {
  return (
    <div className="error-msg-outer">
      <ErrorOutlineIcon fontSize="large" />
    </div>
  );
};
