import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useState, useContext, useEffect } from "react";
import { MasterContext } from "../../context/masterProvider";
import { PoContext } from "../../context/poProvider";

export const Distributor = () => {
  const { distributorOptions, getOptionDetails } = useContext(MasterContext);
  const { setDistributor, distributor } = useContext(PoContext);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (distributor != null) {
      setSelectedOption({
        value: distributor._id,
        label: distributor.title,
      });
    }
  }, [distributor]);

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
