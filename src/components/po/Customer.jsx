import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AccordionDetails from "@mui/material/AccordionDetails";

import { useContext, useState } from "react";
import { MasterContext } from "../../context/masterProvider";
import { PoContext } from "../../context/poProvider";

import "./customAccordians.scss";
import "./customer.scss";

export const Customer = () => {
  const { customerOptions, getOptionDetails } = useContext(MasterContext);
  const { setCustomer, customer } = useContext(PoContext);
  const [newCustomer, setNewCustomer] = useState({});
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
        <div className="customer-details">
          <div className="customer-address-block">
            <div className="item-detail-label">Address</div>
            <div className="item-detail-line"> {customer["address1"]}</div>
            <div className="item-detail-line"> {customer["address2"]}</div>
            <div className="item-detail-line">
              {customer["city"]}-{customer["pin"]}
            </div>
          </div>
          <div className="customer-contact-block">
            <div className="item-detail-label">Contact Person</div>
            <div className="item-detail-line"> {customer["contact"]}</div>
            <div className="item-detail-label"> Contact Email</div>
            <div className="item-detail-line">{customer["contactEmail"]}</div>
            <div className="item-detail-label"> Contact No.</div>
            <div className="item-detail-line">{customer["contactNumber"]}</div>
          </div>
        </div>
      )}
    </AccordionDetails>
  );
};
