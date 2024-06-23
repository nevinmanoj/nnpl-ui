import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useState, useContext } from "react";
import { MasterContext } from "../../context/masterProvider";
import { PoContext } from "../../context/poProvider";

export const Distributor = () => {
  const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option

  const { distributorOptions, getOptionDetails } = useContext(MasterContext);
  const { setDistributor, distributor } = useContext(PoContext);

  const handleChange = async (event, newValue) => {
    setSelectedOption(newValue);
    const res = await getOptionDetails("distributor", newValue.value);
    if (res != null) {
      setDistributor(res);
    }
  };

  return (
    <div>
      <div>
        <Autocomplete
          value={selectedOption}
          onChange={handleChange}
          options={distributorOptions}
          renderInput={(params) => (
            <TextField {...params} label="Distributor" variant="standard" />
          )}
        />
        {selectedOption != null && distributor != null && (
          <div className="dist-details">
            {Object.entries(distributor).map(([key, value], index) => (
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
