import { EntryProps } from "./props";
import { Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DiagnosisCodeList from "./DiagnosisCodeList";

interface HospitalProps extends EntryProps {}

const Hospital = ({ entry, diagnosis }: HospitalProps) => {
  if (entry.type !== "Hospital") {
    return null;
  }

  return (
    <div>
      <Typography>
        {entry.date}
        <LocalHospitalIcon />
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>Diagnose by {entry.specialist}</Typography>
      <DiagnosisCodeList entry={entry} diagnosis={diagnosis} />
    </div>
  );
};

export default Hospital;
