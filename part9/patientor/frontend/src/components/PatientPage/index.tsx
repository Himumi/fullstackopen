import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import "./index.css";

import type { Patient, DiagnosisMap } from "../../types";

import patientServices from "../../services/patients";
import diagnosisServices from "../../services/diagnosis";

import { Typography } from "@mui/material";
import GenderIcon from "./GenderIcon";
import PatientEntry from "./PatientEntry";

import { convertToDiagnosis } from "./utils";
import EntryForm from "./EntryForm";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisMap>({});

  const retrieveData = () => {
    if (id) {
      patientServices.get(id).then((patient) => setPatient(patient));
      diagnosisServices.getAll().then((data) => {
        setDiagnosis(convertToDiagnosis(data));
      });
    }
  };

  useEffect(retrieveData, [id]);

  const marginStyle = {
    margin: "15px 0",
  };

  if (!patient || _.isEmpty(diagnosis)) {
    return null;
  }

  return (
    <div>
      <Typography variant="h5" style={marginStyle}>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <Typography>
        ssh: {patient.ssn} <br />
        occupation: {patient.occupation}
      </Typography>
      <EntryForm
        patient={patient}
        setPatient={setPatient}
        options={Object.keys(diagnosis)}
      />
      <div style={marginStyle}>
        {patient.entries.map((e) => (
          <PatientEntry key={e.id} entry={e} diagnosis={diagnosis} />
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
