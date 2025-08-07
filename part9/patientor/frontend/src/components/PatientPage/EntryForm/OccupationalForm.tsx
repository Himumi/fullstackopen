import { useState } from "react";

import { NewEntry } from "../../../types";
import { FormProps } from "./props";
import { Typography } from "@mui/material";
import FormContainer from "./FormContainer";
import EntryInput from "./EntryInput";
import EntryButtons from "./EntryButtons";
import MultipleSelect from "../../Reusable/MultipleSelect";

interface Props extends FormProps {}

const OccupationalForm = ({ onSubmit, options }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
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
      diagnosisCodes,
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
    setDiagnosisCodes([]);
  };

  const handleCancel = resetValues;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Typography variant="h5" fontWeight="bold">
        Occupational Healthcare
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
      <EntryInput
        label="Employee"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <div style={{ margin: "10px 0 0 20px" }}>
        <Typography fontWeight="bold">Sick leave</Typography>
        <EntryInput
          label="Start date"
          value={sickStartDate}
          type="date"
          onChange={({ target }) => setSickStartDate(target.value)}
        />
        <EntryInput
          label="End date"
          value={sickEndDate}
          type="date"
          onChange={({ target }) => setSickEndDate(target.value)}
        />
      </div>
      <EntryButtons onCancel={handleCancel} />
    </FormContainer>
  );
};

export default OccupationalForm;
