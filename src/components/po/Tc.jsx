import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useContext } from "react";
import { PoContext } from "../../context/poProvider";

import "./Tc.scss";
import "./customAccordians.scss";

export const Tc = () => {
  const { tc, setTc } = useContext(PoContext);
  const handleTcChange = (value, key) => {
    setTc({ ...tc, [key]: value });
  };
  return (
    <div>
      <Accordion className="accordian">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="acc-heading-value"> Terms & Conditions </div>
        </AccordionSummary>
        <AccordionDetails>
          {Object.entries(tc).map(([key, value]) => (
            <div key={key} className="tc-input-div">
              <TextField
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
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
