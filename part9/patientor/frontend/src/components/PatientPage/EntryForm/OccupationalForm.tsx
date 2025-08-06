import { useState } from "react";

import { NewEntry } from "../../../types";
import { Typography } from "@mui/material";
import FormContainer from "./FormContainer";
import EntryInput from "./EntryInput";
import EntryButtons from "./EntryButtons";

interface Props {
  onSubmit: (entry: NewEntry) => void;
}

const OccupationalForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickStartDate, setSickStartDate] = useState<string>("");
  const [sickEndDate, setSickEndDate] = useState<string>("");

  const handleCreate = onSubmit;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newEntry: NewEntry = {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(", "),
      employerName,
      sickLeave: {
        startDate: sickStartDate,
        endDate: sickEndDate,
      },
    };

    // Add new entry to server
    handleCreate(newEntry);

    // resetValues();
  };
  const resetValues = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
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
        label="Diagnosis codes"
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />
      <EntryInput
        label="Employer name"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <div style={{ margin: "10px 0 0 20px" }}>
        <Typography fontWeight="bold">Sick leave</Typography>
        <EntryInput
          label="Start date"
          value={sickStartDate}
          onChange={({ target }) => setSickStartDate(target.value)}
        />
        <EntryInput
          label="End date"
          value={sickEndDate}
          onChange={({ target }) => setSickEndDate(target.value)}
        />
      </div>
      <EntryButtons onCancel={handleCancel} />
    </FormContainer>
  );
};

export default OccupationalForm;
