import Button from "@mui/material/Button";
import "./Header.scss";

export const DocHeader = ({
  save,
  download,
  status,
  id,
  saving,
  downloading,
}) => {
  return (
    <div className="doc-header">
      <Button
        sx={{ marginRight: "10px" }}
        variant="contained"
        className="save-button"
        onClick={() => save()}
        disabled={saving}
      >
        {saving ? "Saving" : "Save"}
      </Button>

      {id != null && id != "new" && (
        <Button
          variant="outlined"
          disabled={downloading}
          onClick={() => {
            download();
          }}
        >
          {downloading ? "Downloading" : "Download"}
        </Button>
      )}
    </div>
  );
};
