import diagnosisEntries from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosisEntries;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};