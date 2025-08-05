import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient | [] => {
  const patient = patients.find((p) => p.id === id);

  if (patient !== undefined) {
    return patient;
  } else {
    return [];
  }
};

export default {
  getPatients,
  addPatient,
  getPatient,
};
