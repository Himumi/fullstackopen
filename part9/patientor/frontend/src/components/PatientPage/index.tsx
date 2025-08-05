import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "../../types";
import patientServices from "../../services/patients";
import GenderIcon from "./GenderIcon";
import { Typography } from "@mui/material";

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

  return (
    <div>
      <Typography variant="h5" style={{ margin: "15px 0" }}>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <Typography>
        ssh: {patient.ssn} <br />
        occupation: {patient.occupation}
      </Typography>
    </div>
  );
};

export default PatientPage;
