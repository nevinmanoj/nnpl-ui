import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AccordionDetails from "@mui/material/AccordionDetails";

import { useContext } from "react";
import { MasterContext } from "../../context/masterProvider";

import "./distributor.scss";
import "./customAccordians.scss";

export const Distributor = ({ setDistributor, distributor, status }) => {
  const { distributorOptions, getOptionDetails } = useContext(MasterContext);

  var selectedOption = null;
  if (distributor != null) {
    selectedOption = {
      value: distributor._id,
      label: distributor.title,
    };
  }

  const handleChange = async (event, newValue) => {
    if (newValue == null) {
      return;
    }
    const res = await getOptionDetails("distributor", newValue.value);

    if (res != null) {
      setDistributor(res);
    }
  };

  return (
    <AccordionDetails>
      <div>
        <Autocomplete
          disabled={status != "draft"}
          clearOnEscape={false}
          componentsProps={{
            clearIndicator: null,
          }}
          value={selectedOption}
          onChange={handleChange}
          options={distributorOptions}
          renderInput={(params) => (
            <div className="option-textbox">
              <TextField
                {...params}
                variant="outlined"
                placeholder="Enter Distributor"
                size="small"
              />
            </div>
          )}
        />
        {selectedOption != null && distributor != null && (
          <div className="dist-details">
            <div className="dist-address-block">
              <div className="item-detail-label">Address</div>
              <div className="item-detail-line">{distributor["address1"]}</div>
              <div className="item-detail-line">{distributor["address2"]}</div>
              <div className="item-detail-line">{distributor["address3"]}</div>
            </div>
          </div>
        )}
      </div>
    </AccordionDetails>
  );
};
