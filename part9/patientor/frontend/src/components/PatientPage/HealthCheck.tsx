import { Typography } from "@mui/material";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { EntryProps } from "./props";
import DiagnosisCodeList from "./DiagnosisCodeList";

interface HealthCheckProps extends EntryProps {}

const HealthCheck = ({ entry, diagnosis }: HealthCheckProps) => {
  if (entry.type !== "HealthCheck") {
    return null;
  }

  return (
    <div>
      <Typography>
        {entry.date}
        <MedicalInformationIcon />
      </Typography>
      <Typography>{entry.description}</Typography>
      <Typography>
        <FavoriteIcon />
      </Typography>
      <Typography>Diagnose by {entry.specialist}</Typography>
      <DiagnosisCodeList entry={entry} diagnosis={diagnosis} />
    </div>
  );
};

export default HealthCheck;
