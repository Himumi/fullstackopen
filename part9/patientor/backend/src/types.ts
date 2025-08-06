import { z } from 'zod';

export const DiagnoseSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type DiagnoseEntry = z.infer<typeof DiagnoseSchema>;

// Patient types

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

export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().regex(/\d{6}-\d{2,3}[\d\w]?/),
  gender: z.enum(Gender),
  occupation: z.string(),
});

// Entry types

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

const BaseEntrySchema = z.object({
  date: z.iso.date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.optional(z.array(z.string())),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.string('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating),
});

const DischargeSchema = z.object({
  date: z.iso.date(),
  criteria: z.string(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.string('Hospital'),
  discharge: DischargeSchema,
});

const SickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.string('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.optional(SickLeaveSchema),
});

export const NewEntrySchema = z.union([
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

const EntryId = z.object({
  id: z.string(),
});

export const EntrySchema = z.intersection(EntryId, NewEntrySchema);

export type NewEntry = z.infer<typeof NewEntrySchema>;
export type Entry = z.infer<typeof EntrySchema>;
