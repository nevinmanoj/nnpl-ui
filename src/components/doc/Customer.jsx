import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
import AccordionDetails from "@mui/material/AccordionDetails";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useContext } from "react";

import { MasterContext } from "../../context/masterProvider";

import "./customAccordians.scss";
import "./customer.scss";

export const Customer = ({
  setCustomer,
  customer,
  isNew,
  setIsNew,
  errors,
  setErrors,
  status,
}) => {
  const { getOptionValues, getOptionDetails } = useContext(MasterContext);

  const errorActive = errors.customer.value;
  var selectedOption = null;
  if (customer != null) {
    selectedOption = {
      value: customer._id,
      label: customer.title,
    };
  }

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setIsNew(true);
      setCustomer({});
    } else {
      setCustomer(null);
    }
    setIsNew(newMode);
  };

  const handleChange = async (event, newValue) => {
    if (newValue == null) {
      setCustomer(null);
      setIsNew(false);
      return;
    }
    const res = await getOptionDetails("customer", newValue.value);
    if (res != null) {
      setCustomer(res);
      setIsNew(false);
      if (errors.customer.value) {
        setErrors({ ...errors, customer: { value: false, msg: "" } });
      }
    }
  };

  const modifyNewCustomer = (label, value) => {
    setCustomer({
      ...customer,
      [label]: value,
    });
  };

  return (
    <AccordionDetails>
      <div className="primary-input-block">
        {isNew ? (
          <TextField
            sx={{ width: "50vw", paddingRight: "10px", height: "40px" }}
            label="Title"
            error={
              errorActive && (customer.title == null || customer.title == "")
            }
            placeholder="Enter a title or company name"
            onChange={(e) => {
              modifyNewCustomer("title", e.target.value);
            }}
            variant="outlined"
            size="small"
          />
        ) : (
          <Autocomplete
            disabled={status != "draft"}
            clearOnEscape={false}
            componentsProps={{
              clearIndicator: null,
            }}
            value={selectedOption}
            onChange={handleChange}
            options={getOptionValues("customer")}
            renderInput={(params) => (
              <div className="option-textbox">
                <TextField
                  sx={{ width: "50vw", paddingRight: "10px", height: "40px" }}
                  {...params}
                  variant="outlined"
                  placeholder="Enter Customer"
                  size="small"
                />
              </div>
            )}
          />
        )}
        {status == "draft" && (
          <ToggleButtonGroup
            color="primary"
            value={isNew}
            size="small"
            exclusive
            onChange={handleModeChange}
            aria-label="Platform"
          >
            <ToggleButton value={false}>Use Existing Customer</ToggleButton>
            <ToggleButton value={true}>Add New Customer</ToggleButton>
          </ToggleButtonGroup>
        )}
      </div>

      {((selectedOption != null && customer != null) || isNew) && (
        <div className="customer-details">
          <div className="customer-address-block">
            <div className="customer-name-block">
              <div className="item-detail-label">Company Name</div>
              {isNew ? (
                <>
                  <div className="customer-value-input">
                    <TextField
                      error={
                        errorActive &&
                        (customer.companyName == null ||
                          customer.companyName == "")
                      }
                      sx={{ marginTop: "10px", width: "20vw" }}
                      label="Company Name"
                      onChange={(e) => {
                        modifyNewCustomer("companyName", e.target.value);
                      }}
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="item-detail-line">
                    {customer["companyName"]}
                  </div>
                </>
              )}
            </div>
            <div className="item-detail-label">Address</div>
            {isNew ? (
              <>
                <div className="customer-value-input">
                  <TextField
                    error={
                      errorActive &&
                      (customer.address1 == null || customer.address1 == "")
                    }
                    sx={{ marginTop: "10px", width: "20vw" }}
                    label="Address 1"
                    onChange={(e) => {
                      modifyNewCustomer("address1", e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="customer-value-input">
                  <TextField
                    error={
                      errorActive &&
                      (customer.address2 == null || customer.address2 == "")
                    }
                    sx={{ width: "20vw" }}
                    label="Address 2"
                    onChange={(e) => {
                      modifyNewCustomer("address2", e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="customer-value-input">
                  <TextField
                    sx={{ width: "20vw" }}
                    error={
                      errorActive &&
                      (customer.city == null || customer.city == "")
                    }
                    label="City"
                    onChange={(e) => {
                      modifyNewCustomer("city", e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="customer-value-input">
                  <TextField
                    label="Pin"
                    error={
                      errorActive &&
                      (customer.pin == null || customer.pin == "")
                    }
                    onChange={(e) => {
                      modifyNewCustomer("pin", e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="item-detail-line"> {customer["address1"]}</div>
                <div className="item-detail-line"> {customer["address2"]}</div>
                <div className="item-detail-line">
                  {customer["city"]}-{customer["pin"]}
                </div>
              </>
            )}
          </div>
          <div className="customer-contact-block">
            {isNew ? (
              <>
                <div className="item-detail-label">Contact</div>
                <div className="customer-value-input">
                  <TextField
                    error={
                      errorActive &&
                      (customer.contact == null || customer.contact == "")
                    }
                    sx={{ marginTop: "10px", width: "20vw" }}
                    label="Contact Person"
                    onChange={(e) => {
                      modifyNewCustomer("contact", e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="customer-value-input">
                  <TextField
                    error={
                      errorActive &&
                      (customer.contactEmail == null ||
                        customer.contactEmail == "")
                    }
                    sx={{ width: "20vw" }}
                    label="Contact Email"
                    onChange={(e) => {
                      modifyNewCustomer("contactEmail", e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="customer-value-input">
                  <TextField
                    error={
                      errorActive &&
                      (customer.contactNumber == null ||
                        customer.contactNumber == "")
                    }
                    sx={{ width: "20vw" }}
                    label="Contact Number"
                    onChange={(e) => {
                      modifyNewCustomer("contactNumber", e.target.value);
                    }}
                    variant="outlined"
                    size="small"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="item-detail-label">Contact Person</div>
                <div className="item-detail-line"> {customer["contact"]}</div>
                <div className="item-detail-label"> Contact Email</div>
                <div className="item-detail-line">
                  {customer["contactEmail"]}
                </div>
                <div className="item-detail-label"> Contact No.</div>
                <div className="item-detail-line">
                  {customer["contactNumber"]}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AccordionDetails>
  );
};
