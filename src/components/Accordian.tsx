import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IProps {
  title: string;
  desciption?: string;
  children: any;
  defaultExpanded?: boolean;
}
const SimpleAccordion = (props: IProps) => {
  return (
    <Accordion
      defaultExpanded={!!props.defaultExpanded}
      style={{ marginBottom: "10px", width: "auto" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div>
          <Typography variant={"h5"}>{props.title}</Typography>
          {!!props.desciption && (
            <Typography variant={"subtitle2"}>{props.desciption}</Typography>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
};

export default SimpleAccordion;
