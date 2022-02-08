import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const setPatientList = (patientList: Patient[]): { type: "SET_PATIENT_LIST", payload: Patient[] } => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (newPatient: Patient): { type: "ADD_PATIENT", payload: Patient } => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const updatePatient = (currentPatient: Patient): { type: "UPDATE_PATIENT", payload: Patient } => {
  return {
    type: "UPDATE_PATIENT",
    payload: currentPatient
  };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): { type: "SET_DIAGNOSIS_LIST", payload: Diagnosis[] } => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: Object.assign({ssn: action.payload.ssn, entries: action.payload.entries}, state.patients[action.payload.id])
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};
