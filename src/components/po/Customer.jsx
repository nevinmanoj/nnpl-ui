import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useState, useContext } from "react";
import { MasterContext } from "../../context/masterProvider";
import { PoContext } from "../../context/poProvider";

export const Customer = () => {
  const [selectedOption, setSelectedOption] = useState(null); // State to store the selected option

  const { customerOptions, getOptionDetails } = useContext(MasterContext);
  const { setCustomer, customer } = useContext(PoContext);

  const handleChange = async (event, newValue) => {
    setSelectedOption(newValue);
    const res = await getOptionDetails("customer", newValue.value);
    if (res != null) {
      setCustomer(res);
    }
  };

  return (
    <div>
      <div>
        <Autocomplete
          value={selectedOption}
          onChange={handleChange}
          options={customerOptions}
          renderInput={(params) => (
            <TextField {...params} label="Customer" variant="standard" />
          )}
        />
        {selectedOption != null && customer != null && (
          <div className="dist-details">
            {Object.entries(customer).map(([key, value], index) => (
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
