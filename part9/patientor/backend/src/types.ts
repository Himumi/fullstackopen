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
