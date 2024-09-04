import { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { MasterContext } from "../../context/masterProvider";
import { ErrorMessage } from "./errorMessage";

import "./ledgerAccount.scss";

export const LedgerAccount = ({
  ledger,
  setLedger,
  errors,
  status,
  setErrors,
}) => {
  const { getOptionValues, getOptionDetails } = useContext(MasterContext);

  const errorActive = errors.ledgerAccount.value;

  var selectedOption = null;
  if (ledger != null) {
    selectedOption = {
      value: ledger._id,
      label: ledger.title,
    };
  }

  const handleChange = async (event, newValue) => {
    if (newValue == null) {
      return;
    }
    const res = await getOptionDetails("ledger", newValue.value);
    if (res != null) {
      setLedger(res);
      if (errors.ledgerAccount.value) {
        setErrors({ ...errors, ledgerAccount: { value: false, msg: "" } });
      }
    }
  };

  return (
    <div
      className="ledger-outer"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="ledger-block">
        <div className="ledger-label">GST Precentage</div>
        <Autocomplete
          disabled={status != "draft"}
          clearOnEscape={false}
          error={errorActive}
          componentsProps={{
            clearIndicator: null,
          }}
          value={selectedOption}
          onChange={handleChange}
          options={getOptionValues("ledger")}
          renderInput={(params) => (
            <div className="option-textbox">
              <TextField
                error={errorActive}
                sx={{ width: "50vw", paddingRight: "10px", height: "40px" }}
                {...params}
                variant="outlined"
                placeholder="Select GST Precentage"
                size="small"
              />
            </div>
          )}
        />
      </div>
      <ErrorMessage errors={errors} label={"ledgerAccount"} loc={"right"} />
    </div>
  );
};
