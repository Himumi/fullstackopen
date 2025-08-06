import { useState } from "react";

import { NewEntry } from "../../../types";
import { FormProps } from "./props";
import { Typography } from "@mui/material";
import EntryInput from "./EntryInput";
import EntryButtons from "./EntryButtons";
import FormContainer from "./FormContainer";

interface Props extends FormProps {}

const HealthCheckForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const handleCreate = onSubmit;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newEntry: NewEntry = {
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      type: "HealthCheck",
      diagnosisCodes: diagnosisCodes.split(", "),
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
    setDiagnosisCodes("");
  };

  const handleCancel = resetValues;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Typography variant="h5" fontWeight="bold">
        New HealthCheck entry
      </Typography>
      <EntryInput
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <EntryInput
        label="Date"
        value={date}
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
        onChange={({ target }) => setHealthCheckRating(target.value)}
      />
      <EntryInput
        label="Diagnosis codes"
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />
      <EntryButtons onCancel={handleCancel} />
    </FormContainer>
  );
};

export default HealthCheckForm;
