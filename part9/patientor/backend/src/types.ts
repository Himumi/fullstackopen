import { z } from 'zod';

export const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type DiagnoseEntry = z.infer<typeof DiagnoseSchema>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().regex(/\d{6}-\d{2,3}[\d\w]?/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export interface PatientEntry extends NewPatientEntry {
  id: string;
}
export type PatientEntryWithoutSsn = Omit<PatientEntry, 'ssn'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
