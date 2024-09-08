import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AccordionDetails from "@mui/material/AccordionDetails";

import { useContext } from "react";
import { MasterContext } from "../../context/masterProvider";

import "./neural.scss";
import "./customAccordians.scss";

export const Neural = ({ setBilling, billing, status, errors, setErrors }) => {
  const { getOptionValues, getOptionDetails } = useContext(MasterContext);

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
      if (errors.billing.value) {
        setErrors({ ...errors, billing: { value: false, msg: "" } });
      }
    }
  };

  return (
    <div>
      <AccordionDetails>
        <Autocomplete
          disabled={status != "draft"}
          clearOnEscape={false}
          componentsProps={{
            clearIndicator: null,
          }}
          value={selectedOption}
          onChange={handleChange}
          options={getOptionValues("neural")}
          renderInput={(params) => (
            <div className="option-textbox">
              <TextField
                {...params}
                error={
                  errors.billing.value && (billing == null || billing == "")
                }
                variant="outlined"
                placeholder="Enter Billing Location"
                size="small"
              />
            </div>
          )}
        />

        {selectedOption != null && billing != null && (
          <div className="billing-details">
            <div>
              <div className="billing-address-block">
                <div className="item-detail-label">Address</div>
                <div className="item-detail-line"> {billing["address1"]}</div>
                <div className="item-detail-line"> {billing["address2"]}</div>
                <div className="item-detail-line"> {billing["address3"]}</div>
              </div>
              <div className="billing-nos">
                <div className="item-detail-label">GST ID</div>
                <div className="item-detail-line"> {billing["gst"]} </div>
                <div className="item-detail-label">PAN</div>
                <div className="item-detail-line"> {billing["pan"]}</div>
              </div>
            </div>
            <div className="billing-contact-block">
              <div className="item-detail-label">Email</div>
              <div className="item-detail-line"> {billing["email"]}</div>
              <div className="item-detail-label">Fax No.</div>
              <div className="item-detail-line"> {billing["faxno"]}</div>
              <div className="item-detail-label">Ph No.</div>
              <div className="item-detail-line"> {billing["phno"]}</div>
            </div>
          </div>
        )}
      </AccordionDetails>
    </div>
  );
};
