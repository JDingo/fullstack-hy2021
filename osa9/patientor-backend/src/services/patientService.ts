import patients from '../../data/patients';
import { NonSensitivePatientEntry, Patient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';
import patientEntries from '../../data/patients';

const getPatients = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Array<NonSensitivePatientEntry> => {
  return patients.filter(patient => patient.id === id);
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry
  };

  patientEntries.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  addPatient
};