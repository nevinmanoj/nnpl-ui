import { useContext } from "react";
import { PoContext } from "../../context/poProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { ErrorMessage } from "./errorMessage";
import dayjs from "dayjs";
import "./info.scss";

export const PoInfo = () => {
  const { pno, date, setDate } = useContext(PoContext);

  return (
    <div className="po-info-outer">
      <div className="po-pno-block">
        <div className="po-pno-label">Purchase Order</div>
        <div className="po-pno-value">{pno}</div>
      </div>
      <div className="po-info-date">
        <ErrorMessage label="date" loc="top" />
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
