import { Typography } from "@mui/material";
import { EntryProps } from "./props";

interface PatientEntryProps extends EntryProps {}

const PatientEntry = (props: PatientEntryProps) => {
  const { entry, diagnosis } = props;
  return (
    <div>
      <Typography>
        {entry.date}
        {entry.description}
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map((d) => (
          <li key={d}>
            {d}
            {diagnosis[d] && diagnosis[d].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientEntry;
