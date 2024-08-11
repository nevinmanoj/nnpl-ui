import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

import { ErrorMessage } from "./errorMessage";
import dayjs from "dayjs";
import "./info.scss";

export const DocInfo = ({
  title,
  value,
  date,
  setDate,
  errors,
  editableNo,
  onNoChange,
  status,
}) => {
  return (
    <div className="doc-info-outer">
      <div className="doc-pno-block">
        <div className="doc-pno-label">{title}</div>
        <TextField
          multiline
          onChange={(e) => onNoChange(e)}
          variant="outlined"
          disabled={!editableNo || status != "draft"}
          size="small"
          sx={{ width: "20vw" }}
          value={value}
        />
      </div>
      <div className="doc-info-date">
        <ErrorMessage label="date" loc="top" errors={errors} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled={status != "draft"}
            sx={{ marginLeft: "10px" }}
            format="LL"
            label="Date"
            value={dayjs(date)}
            onChange={(newValue) => {
              console.log(newValue);
              setDate(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};
