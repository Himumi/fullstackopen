import { useState } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";

import patientServices from "../../../services/patients";

import { NewEntry, Patient } from "../../../types";

import { SelectChangeEvent } from "@mui/material";
import Notif from "../../Notif";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalForm from "./OccupationalForm";
import SelectEntry from "./SelectEntry";

interface Props {
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  patient: Patient;
}

const EntryForm = (props: Props) => {
  const id = useParams().id as string;
  const [notif, setNotif] = useState<string | null>(null);
  const [entry, setEntry] = useState<string>("HealthCheck");

  const handleCreate = async (newEntry: NewEntry) => {
    // Append a new entry to patient's entries
    try {
      const entry = await patientServices.createEntry(id, newEntry);
      props.setPatient({
        ...props.patient,
        entries: props.patient.entries.concat(entry),
      });
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (isAxiosError(error)) {
      const errorMessages = error.response?.data.messages;
      handleNotif(errorMessages.join(", "));
    }
  };

  const handleNotif = (messages: string) => {
    setNotif(messages);
    setTimeout(() => setNotif(null), 3000);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setEntry(event.target.value);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Notif message={notif} />
      <SelectEntry entry={entry} onChange={handleChange} />
      {entry === "HealthCheck" && <HealthCheckForm onSubmit={handleCreate} />}
      {entry === "Hospital" && <HospitalForm onSubmit={handleCreate} />}
      {entry === "OccupationalHealthcare" && (
        <OccupationalForm onSubmit={handleCreate} />
      )}
    </div>
  );
};

export default EntryForm;
