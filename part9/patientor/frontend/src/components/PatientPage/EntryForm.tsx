import { useState } from "react";
import { NewEntry, Patient } from "../../types";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import patientServices from "../../services/patients";
import EntryInput from "./EntryInput";

interface EntryFormProps {
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  patient: Patient;
}

const EntryForm = (props: EntryFormProps) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const id = useParams().id as string;

  const resetValues = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes("");
  };

  const handleCancel = resetValues;

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();

    const newEntry: NewEntry = {
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      type: "HealthCheck",
      diagnosisCodes: diagnosisCodes.split(", "),
    };

    // Append a new entry to patient's entries
    const entry = await patientServices.createEntry(id, newEntry);
    props.setPatient({
      ...props.patient,
      entries: props.patient.entries.concat(entry),
    });

    resetValues();
  };

  const formStyles = {
    border: "1px dashed black",
    padding: 30,
  };
  return (
    <div style={{ margin: "20px 0" }}>
      <form style={formStyles} onSubmit={handleAdd}>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
