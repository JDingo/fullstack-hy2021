import { Entry, Gender, HealthCheckRating, NewPatientEntry } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields ): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newPatient;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

export const isEntry = (entry: any): Entry => {
  if (entry.id) {
    throw new Error("Already defined ID");
  }

  if (!entry || !entry.description || !entry.date || !entry.specialist ) {
    throw new Error('Malformed entry');
  }

  const targetEntry = entry as Entry;

  if (targetEntry.type === "Hospital") {
    if (isString(targetEntry.discharge.date) && isString(targetEntry.discharge.criteria)) {
      return targetEntry;
    }
  } else if (targetEntry.type === "HealthCheck") {
    if (isHealthCheckRating(targetEntry.healthCheckRating)) {
      return targetEntry;
    }
  } else if (targetEntry.type === "OccupationalHealthcare") {
    if (isString(targetEntry.employerName)) {
      return targetEntry;
    }
  }

  throw new Error("Invalid type");
};

export default toNewPatientEntry;