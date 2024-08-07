import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ErrorMessage } from "./errorMessage";
import dayjs from "dayjs";
import "./info.scss";

export const DocInfo = ({ title, value, date, setDate, errors }) => {
  return (
    <div className="doc-info-outer">
      <div className="doc-pno-block">
        <div className="doc-pno-label">{title}</div>
        <div className="doc-pno-value">{value}</div>
      </div>
      <div className="doc-info-date">
        <ErrorMessage label="date" loc="top" errors={errors} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
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
