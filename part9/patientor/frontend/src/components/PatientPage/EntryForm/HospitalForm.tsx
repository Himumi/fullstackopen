import { useState } from "react";

import { NewEntry } from "../../../types";
import { FormProps } from "./props";
import { Typography } from "@mui/material";
import EntryInput from "./EntryInput";
import EntryButtons from "./EntryButtons";
import FormContainer from "./FormContainer";
import MultipleSelect from "../../Reusable/MultipleSelect";

interface Props extends FormProps {}

const HospitalForm = ({ onSubmit, options }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const handleCreate = onSubmit;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newEntry: NewEntry = {
      type: "Hospital",
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };

    handleCreate(newEntry);
  };

  const resetValues = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
  };

  const handleCancel = resetValues;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Typography variant="h5" fontWeight="bold">
        Hospital Entry
      </Typography>
      <EntryInput
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <EntryInput
        label="Date"
        value={date}
        type="date"
        onChange={({ target }) => setDate(target.value)}
      />
      <EntryInput
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <div>
        <Typography margin="10px 0">Diagnosis Codes</Typography>
        <MultipleSelect
          label="Codes"
          names={options}
          onSelect={setDiagnosisCodes}
        />
      </div>
      <div style={{ margin: "10px 0 0 20px" }}>
        <Typography fontWeight="bold">Discharge</Typography>
        <EntryInput
          label="Date"
          value={dischargeDate}
          type="date"
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <EntryInput
          label="Criteria"
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
      </div>
      <EntryButtons onCancel={handleCancel} />
    </FormContainer>
  );
};

export default HospitalForm;
