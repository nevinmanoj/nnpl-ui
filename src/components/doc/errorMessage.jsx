import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useContext } from "react";
import { PoContext } from "../../context/poProvider";

import "./errorMessage.scss";

export const ErrorMessage = ({ label, loc }) => {
  const { errors } = useContext(PoContext);
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
