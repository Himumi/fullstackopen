import { useState } from "react";

import { NewEntry } from "../../../types";
import { FormProps } from "./props";
import { Typography } from "@mui/material";
import EntryInput from "./EntryInput";
import EntryButtons from "./EntryButtons";
import FormContainer from "./FormContainer";
import MultipleSelect from "../../Reusable/MultipleSelect";

interface Props extends FormProps {}

const HealthCheckForm = ({ onSubmit, options }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("0");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleCreate = onSubmit;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newEntry: NewEntry = {
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      type: "HealthCheck",
      diagnosisCodes,
    };

    // Add new entry to server
    handleCreate(newEntry);

    // resetValues();
  };

  const resetValues = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes([]);
  };

  const handleCancel = resetValues;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Typography variant="h5" fontWeight="bold">
        Health Check Entry
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
      <EntryInput
        label="HealthCheck rating"
        value={healthCheckRating}
        type="number"
        inputProps={{ min: 0, max: 3, step: 1 }}
        onChange={({ target }) => setHealthCheckRating(target.value)}
      />
      <div>
        <Typography margin="10px 0">Diagnosis Codes</Typography>
        <MultipleSelect
          label="Codes"
          names={options}
          onSelect={setDiagnosisCodes}
        />
      </div>
      <EntryButtons onCancel={handleCancel} />
    </FormContainer>
  );
};

export default HealthCheckForm;
