import { Gender, NewPatientEntry } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
  return Boolean(ssn.match(/\d{6}-\d{2,3}[\w \d]?/g));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const toNewPatientEntry = (body: unknown): NewPatientEntry => {
  if (!body || typeof body !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in body && 'dateOfBirth' in body && 'ssn' in body && 'gender' in body && 'occupation' in body) {
    const newPatientEntry: NewPatientEntry = {
      name: parseName(body.name),
      dateOfBirth: parseDate(body.dateOfBirth),
      ssn: parseSsn(body.ssn),
      gender: parseGender(body.gender),
      occupation: parseOccupation(body.occupation)
    };

    return newPatientEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
