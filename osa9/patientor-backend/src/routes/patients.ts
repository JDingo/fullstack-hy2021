import express, { Request } from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req: Request<unknown, unknown, { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }>, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
    else {
      res.status(400);
    }
  }
});

export default router;