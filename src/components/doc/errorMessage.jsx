import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import "./errorMessage.scss";

export const ErrorMessage = ({ label, loc, errors }) => {
  const error = errors[label];
  return error.value ? (
    <div className="error-msg-outer">
      <div className={`error-message ${loc}`}>{error.value && error.msg}</div>
      <ErrorOutlineIcon fontSize="large" />
    </div>
  ) : (
    <div></div>
  );
};
