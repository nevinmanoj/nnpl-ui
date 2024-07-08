import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useState, useContext, useEffect } from "react";
import { MasterContext } from "../../context/masterProvider";
import { PoContext } from "../../context/poProvider";

export const Neural = () => {
  const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option

  const { neuralOptions, getOptionDetails } = useContext(MasterContext);
  const { setBilling, billing } = useContext(PoContext);

  useEffect(() => {
    if (billing != null) {
      setSelectedOption({
        value: billing._id,
        label: billing.title,
      });
    }
  }, [billing]);

  const handleChange = async (event, newValue) => {
    setSelectedOption(newValue);
    const res = await getOptionDetails("neural", newValue.value);
    if (res != null) {
      setBilling(res);
    }
  };

  return (
    <div>
      <div>
        <Autocomplete
          value={selectedOption}
          onChange={handleChange}
          options={neuralOptions}
          renderInput={(params) => (
            <TextField {...params} label="Billing" variant="standard" />
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
      </div>
    </div>
  );
};
