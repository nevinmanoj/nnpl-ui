import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useState } from "react";

import "./Tc.scss";
import "./customAccordians.scss";

export const Tc = ({ tc, setTc, status }) => {
  const [heading, setheading] = useState("");
  const [value, setvalue] = useState("");
  const [isErr, setisErr] = useState(false);
  const handleTcChange = (val, key) => {
    setTc({ ...tc, [key]: val });
  };
  const removeKeyValuePair = (key) => {
    setTc((prevState) => {
      const newState = { ...prevState };
      delete newState[key];
      return newState;
    });
  };

  return (
    <div>
      <Accordion className="accordian" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="acc-heading-value"> Terms & Conditions </div>
        </AccordionSummary>
        <AccordionDetails>
          {status == "draft" && (
            <div className="tc-add-block">
              <TextField
                className="tc-input-key"
                variant="outlined"
                size="small"
                label={"Add'l. T & C"}
                placeholder="Eg:Payment"
                onChange={(e) => setheading(e.target.value)}
                value={heading}
                error={heading === "" && isErr}
              />
              <TextField
                className="tc-input-value"
                variant="outlined"
                size="small"
                label="Value"
                value={value}
                error={value === "" && isErr}
                onChange={(e) => setvalue(e.target.value)}
                placeholder="Eg: paid within 60 days from the date of billing"
              />
              <Button
                variant="outlined"
                className="save-button"
                onClick={() => {
                  if (heading === "" || value === "") {
                    setisErr(true);
                  } else {
                    handleTcChange(value, heading);
                    setheading("");
                    setvalue("");
                    setisErr(false);
                  }
                }}
              >
                Add
              </Button>
            </div>
          )}

          {Object.entries(tc).map(([key, value]) => (
            <div key={key} className="tc-input-div">
              <TextField
                disabled={status != "draft"}
                className="tc-input"
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                variant="outlined"
                size="small"
                onChange={(e) => {
                  handleTcChange(e.target.value, key);
                }}
                value={value}
                placeholder={
                  "Enter " +
                  key.charAt(0).toUpperCase() +
                  key.slice(1) +
                  " Clause"
                }
              />

              {status == "draft" && (
                <IconButton
                  onClick={(e) => {
                    removeKeyValuePair(key);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
