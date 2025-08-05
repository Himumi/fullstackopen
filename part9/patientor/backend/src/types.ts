import { z } from 'zod';

export const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type DiagnoseEntry = z.infer<typeof DiagnoseSchema>;

type Date = string;

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface Discharge {
  date: Date;
  criteria: string;
}

interface SickLeave {
  startDate: Date;
  endDate: Date;
}

interface BaseEntry {
  id: string;
  date: Date;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NewPatientEntry = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().regex(/\d{6}-\d{2,3}[\d\w]?/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

// export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
// export interface PatientEntry extends NewPatientEntry {
//   id: string;
// }
// export type PatientEntryWithoutSsn = Omit<PatientEntry, 'ssn'>;
