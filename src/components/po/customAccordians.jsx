import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { ErrorMessage } from "./errorMessage";
import { useState } from "react";

import "./customAccordians.scss";

export const CustomPoAccordian = ({ value, label, children }) => {
  const [expanded, setExpanded] = useState(true);

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
          <div style={{ display: "flex" }}>
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
            <ErrorMessage label={label.toLowerCase()} />
          </div>
        </AccordionSummary>
        {children}
      </Accordion>
    </div>
  );
};
