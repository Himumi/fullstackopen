import { useState } from "react";
import { useParams } from "react-router-dom";
import { isAxiosError } from "axios";

import patientServices from "../../../services/patients";

import { NewEntry, Patient } from "../../../types";
import Notif from "../../Notif";
import HealthCheckForm from "./HealthCheckForm";

interface Props {
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  patient: Patient;
}

const EntryForm = (props: Props) => {
  const id = useParams().id as string;
  const [notif, setNotif] = useState<string | null>(null);

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

  return (
    <div style={{ margin: "20px 0" }}>
      <Notif message={notif} />
      <HealthCheckForm onSubmit={handleCreate} />
    </div>
  );
};

export default EntryForm;
