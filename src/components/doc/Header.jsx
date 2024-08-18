import Button from "@mui/material/Button";
import "./Header.scss";

export const DocHeader = ({ save, download, status, id }) => {
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

      {id != null && id != "new" && (
        <Button
          variant="outlined"
          onClick={() => {
            download();
          }}
        >
          Download
        </Button>
      )}
    </div>
  );
};
