import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "../../types";
import patientServices from "../../services/patients";

import { Typography } from "@mui/material";

import GenderIcon from "./GenderIcon";
import PatientEntry from "./PatientEntry";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientServices.get(id).then((patient) => setPatient(patient));
    }
  }, [id]);

  if (!patient) {
    return;
  }

  const marginStyle = {
    margin: "15px 0",
  };

  return (
    <div>
      <Typography variant="h5" style={marginStyle}>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <Typography>
        ssh: {patient.ssn} <br />
        occupation: {patient.occupation}
      </Typography>
      <div style={marginStyle}>
        {patient.entries.map((e) => (
          <PatientEntry entry={e} />
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
