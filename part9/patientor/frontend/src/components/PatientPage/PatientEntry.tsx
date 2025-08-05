import { EntryProps } from "./props";

interface PatientEntryProps extends EntryProps {}

import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";

const PatientEntry = (props: PatientEntryProps) => {
  const { entry, diagnosis } = props;

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnosis={diagnosis} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnosis={diagnosis} />;
    case "Hospital":
      return <Hospital entry={entry} diagnosis={diagnosis} />;
  }
};

export default PatientEntry;
