import { EntryProps } from "../props";

interface DiagnosisCodeListProps extends EntryProps {}

const DiagnosisCodeList = ({ entry, diagnosis }: DiagnosisCodeListProps) => {
  if (entry.diagnosisCodes === undefined) {
    return null;
  }

  return (
    <ul>
      {entry.diagnosisCodes?.map((d) => (
        <li key={d}>
          {d} {diagnosis[d] && diagnosis[d].name}
        </li>
      ))}
    </ul>
  );
};

export default DiagnosisCodeList;
