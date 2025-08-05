import { EntryProps } from "../props";
import { Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import DiagnosisCodeList from "./DiagnosisCodeList";

interface OccupationalHealthcareProps extends EntryProps {}

const OccupationalHealthcare = ({
  entry,
  diagnosis,
}: OccupationalHealthcareProps) => {
  if (entry.type !== "OccupationalHealthcare") {
    return null;
  }

  return (
    <div className="patientEntry">
      <Typography>
        {entry.date}
        <WorkIcon />
        {entry.employerName}
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>Diagnose by {entry.specialist}</Typography>
      <DiagnosisCodeList entry={entry} diagnosis={diagnosis} />
    </div>
  );
};

export default OccupationalHealthcare;
