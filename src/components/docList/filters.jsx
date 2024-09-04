import { Button, TextField, Autocomplete } from "@mui/material";
import "./filters.scss";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  ddmmyyyy,
  getObjddmmyyyy,
} from "../../utils/formatting/dateFormatting";
import { MasterContext } from "../../context/masterProvider";
import { Calculate } from "@mui/icons-material";
import { capsFirst } from "../../utils/formatting/firstCaps";

const filterHeaders = ["customer", "distributor"];
const dateFilterHeaders = [
  { title: "Start Date", value: "startDate" },
  { title: "End Date", value: "endDate" },
];

export const DocFilter = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { modifyFilter, filter, clearFilter } = useContext(UserContext);
  const { getOptionValues } = useContext(MasterContext);

  const [subfilter, setsubfilter] = useState({});
  useEffect(() => {
    setsubfilter(filter);
  }, [filter]);

  const setFilterValue = (key, value) => {
    modifyFilter({ ...subfilter, [key]: value });
    setsubfilter({ ...subfilter, [key]: value });
  };

  return (
    <div className="doc-filter-outer">
      <div className="filter-heading">Filters</div>
      {filterHeaders.map((v, i) => (
        <div>
          <div className="filter-subheading">{capsFirst(v)}</div>
          <Autocomplete
            clearOnEscape={true}
            componentsProps={{
              clearIndicator: null,
            }}
            value={subfilter[v] === undefined ? null : subfilter[v]}
            onChange={(e, newValue) => {
              setFilterValue(v, newValue ? newValue.label : null);
            }}
            options={getOptionValues(v)}
            renderInput={(params) => (
              <TextField
                sx={{ width: "calc(20vw - 40px)", marginTop: "5px" }}
                {...params}
                variant="outlined"
                placeholder={"Enter " + v}
              />
            )}
          />
        </div>
      ))}
      <div className="filter-subheading">Date Range</div>
      {dateFilterHeaders.map((v, i) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "calc(20vw - 40px)", marginTop: "10px" }}
            format="LL"
            label={v.title}
            value={
              subfilter[v.value] === undefined
                ? null
                : dayjs(getObjddmmyyyy(subfilter[v.value]))
            }
            onChange={(newValue) => {
              setFilterValue(v.value, ddmmyyyy(newValue.$d));
            }}
          />
        </LocalizationProvider>
      ))}

      <div className="filter-buttons">
        {/* <Button
          onClick={() => modifyFilter(subfilter)}
          variant="outlined"
          size="large"
          sx={{ width: "47%" }}
        >
          Apply
        </Button> */}
        <Button
          size="large"
          sx={{ width: "100%" }}
          onClick={() => {
            clearFilter();
            navigator(location.pathname);
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
