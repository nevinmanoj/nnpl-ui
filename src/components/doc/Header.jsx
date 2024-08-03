import Button from "@mui/material/Button";
import "./Header.scss";

export const DocHeader = ({ save, download }) => {
  // const { savePo } = useContext(PoContext);
  return (
    <div className="doc-header">
      <Button
        sx={{ marginRight: "10px" }}
        variant="outlined"
        className="save-button"
        onClick={() => save()}
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
