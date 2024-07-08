import { useContext, useState } from "react";
import { PoContext } from "../../context/poProvider";
import { formatDate } from "../../utils/formatDate";
import DatePicker from "react-datepicker";
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
        <div>Date</div>
        <div>{formatDate(date)}</div>
      </div>
    </div>
  );
};
