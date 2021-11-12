import diagnosisEntries from '../../data/diagnoses';
import { DiagnosisEntry } from '../types';

const getDiagnoses = (): Array<DiagnosisEntry> => {
  return diagnosisEntries;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};