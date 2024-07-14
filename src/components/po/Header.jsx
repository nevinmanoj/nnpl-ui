import Button from "@mui/material/Button";

import { useContext } from "react";
import { PoContext } from "../../context/poProvider";
import "./Header.scss";

export const PoHeader = () => {
  const { savePo } = useContext(PoContext);
  return (
    <div className="po-header">
      <Button
        sx={{ marginRight: "10px" }}
        variant="outlined"
        className="save-button"
        onClick={() => savePo()}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          console.log("Download soon");
        }}
      >
        Download
      </Button>
    </div>
  );
};
