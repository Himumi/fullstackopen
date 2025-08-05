import { Typography } from "@mui/material";
import { EntryProps } from "./props";

import DiagnosisCodeList from "./DiagnosisCodeList";

interface PatientEntryProps extends EntryProps {}

const PatientEntry = (props: PatientEntryProps) => {
  const { entry } = props;
  return (
    <div>
      <Typography>
        {entry.date}
        {entry.description}
      </Typography>
      <DiagnosisCodeList entry={entry} />
    </div>
  );
};

export default PatientEntry;
