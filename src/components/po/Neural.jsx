import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AccordionDetails from "@mui/material/AccordionDetails";

import { useContext } from "react";
import { MasterContext } from "../../context/masterProvider";
import { PoContext } from "../../context/poProvider";

export const Neural = () => {
  const { neuralOptions, getOptionDetails } = useContext(MasterContext);
  const { setBilling, billing } = useContext(PoContext);

  var selectedOption = null;
  if (billing != null) {
    selectedOption = {
      value: billing._id,
      label: billing.title,
    };
  }

  const handleChange = async (event, newValue) => {
    if (newValue == null) {
      return;
    }
    const res = await getOptionDetails("neural", newValue.value);

    if (res != null) {
      setBilling(res);
    }
  };

  return (
    <div>
      <AccordionDetails>
        <Autocomplete
          clearOnEscape={false}
          componentsProps={{
            clearIndicator: null,
          }}
          value={selectedOption}
          onChange={handleChange}
          options={neuralOptions}
          renderInput={(params) => (
            <div className="option-textbox">
              <TextField
                {...params}
                variant="outlined"
                placeholder="Enter Billing Location"
                size="small"
              />
            </div>
          )}
        />

        {selectedOption != null && billing != null && (
          <div className="dist-details">
            {Object.entries(billing).map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </div>
        )}
      </AccordionDetails>
    </div>
  );
};
