import { EntryProps } from "./props";

interface DiagnosisCodeListProps extends EntryProps {}

const DiagnosisCodeList = ({ entry, diagnosis }: DiagnosisCodeListProps) => {
  return (
    <ul>
      {entry.diagnosisCodes?.map((d) => (
        <li>
          {d} {diagnosis[d] && diagnosis[d].name}
        </li>
      ))}
    </ul>
  );
};

export default DiagnosisCodeList;
