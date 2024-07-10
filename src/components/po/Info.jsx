import { useContext, useState } from "react";
import { PoContext } from "../../context/poProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "./info.scss";

export const PoInfo = () => {
  const { pno, date, setDate } = useContext(PoContext);

  const [open, setOpen] = useState(false);

  const handleDateChange = (_date) => {
    setSelectedDate(_date);
    setOpen(false);
  };
  return (
    <div className="po-info-outer">
      <div>
        <div>Purchase Order</div>
        <div>{pno}</div>
      </div>
      <div
        className="po-info-date"
        onClick={() => {
          setOpen(true);
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="LL"
            label="Date"
            value={dayjs(date)}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};
