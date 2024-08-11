import { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { MasterContext } from "../../context/masterProvider";
import { ErrorMessage } from "./errorMessage";

import "./ledgerAccount.scss";

export const Executive = ({ executive, setExecutive, errors }) => {
  const { executiveOptions, getOptionDetails } = useContext(MasterContext);

  const errorActive = errors.executive.value;

  var selectedOption = null;
  if (executive != null) {
    selectedOption = {
      value: executive._id,
      label: executive.name,
    };
  }

  const handleChange = async (event, newValue) => {
    if (newValue == null) {
      return;
    }
    const res = await getOptionDetails("executive", newValue.value);
    if (res != null) {
      setExecutive(res);
    }
  };

  return (
    <div
      className="ledger-outer"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="ledger-block">
        <div className="ledger-label">Sales Executive</div>
        <Autocomplete
          clearOnEscape={false}
          error={errorActive}
          componentsProps={{
            clearIndicator: null,
          }}
          value={selectedOption}
          onChange={handleChange}
          options={executiveOptions}
          renderInput={(params) => (
            <div className="option-textbox">
              <TextField
                error={errorActive}
                sx={{ width: "50vw", paddingRight: "10px", height: "40px" }}
                {...params}
                variant="outlined"
                placeholder="Select Sales Exectuive"
                size="small"
              />
            </div>
          )}
        />
      </div>
      <ErrorMessage errors={errors} label={"executive"} loc={"right"} />
    </div>
  );
};