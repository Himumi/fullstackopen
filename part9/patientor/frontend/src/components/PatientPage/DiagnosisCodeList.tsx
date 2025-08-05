import { EntryProps } from "./props";

interface DiagnosisCodeListProps extends EntryProps {}

const DiagnosisCodeList = (props: DiagnosisCodeListProps) => {
  const { entry } = props;

  if (entry.diagnosisCodes === undefined) {
    return null;
  }

  return (
    <ul>
      {entry.diagnosisCodes.map((d) => (
        <li>{d}</li>
      ))}
    </ul>
  );
};

export default DiagnosisCodeList;
