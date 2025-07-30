import patients from '../../data/patients';
import { PatientEntryWithoutSsn } from '../types';

export const getPatients = (): PatientEntryWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
