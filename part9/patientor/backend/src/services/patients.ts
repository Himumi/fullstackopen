import patients from '../../data/patients';
import {
  NewPatientEntry,
  PatientEntry,
  PatientEntryWithoutSsn,
} from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntryWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry: PatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
};
