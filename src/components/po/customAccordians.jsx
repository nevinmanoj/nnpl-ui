import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

import { useState } from "react";

import "./customAccordians.scss";

export const CustomPoAccordian = ({ value, label, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Accordion
        className="accordian"
        expanded={expanded}
        onChange={(e, exp) => {
          setExpanded(exp);
        }}
      >
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ExpandMoreIcon />}
        >
          {expanded ? (
            <div className="acc-heading-value">{label}</div>
          ) : (
            <div className="acc-heading">
              <div className="acc-heading-label">{label}</div>
              <div className="acc-heading-value">
                {value != null ? value.title : `Add ${label}`}
              </div>
            </div>
          )}
        </AccordionSummary>
        {children}
      </Accordion>
    </div>
  );
};
