import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

import { useState, useContext, useEffect } from "react";

import "./customAccordians.scss";

export const CustomPoAccordian = ({ value, label, children }) => {
  //   const { distributorOptions, getOptionDetails } = useContext(MasterContext);
  //   const { setDistributor, distributor } = useContext(PoContext);

  const [expanded, setExpanded] = useState(true);

  //   const [selectedOption, setSelectedOption] = useState(null);
  //   useEffect(() => {
  //     if (distributor != null) {
  //       setSelectedOption({
  //         value: distributor._id,
  //         label: distributor.title,
  //       });
  //     }
  //   }, [distributor]);

  //   const handleChange = async (event, newValue) => {
  //     setSelectedOption(newValue);
  //     const res = await getOptionDetails("distributor", newValue.value);
  //     if (res != null) {
  //       setDistributor(res);
  //     }
  //   };

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
