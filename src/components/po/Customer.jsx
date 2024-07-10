import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AccordionDetails from "@mui/material/AccordionDetails";

import { useContext } from "react";
import { MasterContext } from "../../context/masterProvider";
import { PoContext } from "../../context/poProvider";

export const Customer = () => {
  const { customerOptions, getOptionDetails } = useContext(MasterContext);
  const { setCustomer, customer } = useContext(PoContext);

  var selectedOption = null;
  if (customer != null) {
    selectedOption = {
      value: customer._id,
      label: customer.title,
    };
  }

  const handleChange = async (event, newValue) => {
    if (newValue == null) {
      return;
    }
    const res = await getOptionDetails("customer", newValue.value);
    if (res != null) {
      setCustomer(res);
    }
  };

  return (
    <AccordionDetails>
      <Autocomplete
        clearOnEscape={false}
        componentsProps={{
          clearIndicator: null,
        }}
        value={selectedOption}
        onChange={handleChange}
        options={customerOptions}
        renderInput={(params) => (
          <div className="option-textbox">
            <TextField
              {...params}
              variant="outlined"
              placeholder="Enter Customer"
              size="small"
            />
          </div>
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
    </AccordionDetails>
  );
};
