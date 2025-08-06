import { v1 as uuid } from 'uuid';
import patients, { updatePatients } from '../../data/patients';
import { Entry, NewEntry, NewPatientEntry, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    entries: [],
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

const updatePatient = (id: string, newEntry: NewEntry): Entry => {
  const entry = {
    id: uuid(),
    ...newEntry,
  };

  const patient = getPatient(id) as Patient;
  patient.entries = [...patient.entries, entry];
  updatePatients(patient);

  return entry;
};

export default {
  getPatients,
  addPatient,
  getPatient,
  updatePatient,
};
