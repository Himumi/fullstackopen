import { Request, Response, Router } from 'express';
import patientServices from '../services/patients';
import {
  Entry,
  NewEntry,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from '../types';
import { newEntryParser } from '../utils/newEntryParser';
import { newPatientParser } from '../utils/newPatientParser';

const router = Router();

interface UserParams {
  id: string;
}

const getPatients = (
  _request: Request,
  response: Response<NonSensitivePatient[]>
) => {
  const patients = patientServices.getPatients();
  response.json(patients);
};

const getPatient = (
  request: Request<UserParams>,
  response: Response<Patient | []>
) => {
  response.json(patientServices.getPatient(request.params.id));
};

const addPatient = (
  request: Request<unknown, unknown, NewPatientEntry>,
  response: Response<Patient>
) => {
  const addedPatient = patientServices.addPatient(request.body);
  response.json(addedPatient);
};

const addPatientEntry = (
  request: Request<{ id: string }, unknown, NewEntry>,
  response: Response<Entry>
) => {
  const id = request.params.id;
  const entry = patientServices.updatePatient(id, request.body);
  response.json(entry);
};

router.get('/', getPatients);
router.get('/:id', getPatient);
router.post('/', newPatientParser, addPatient);
router.post('/:id/entries', newEntryParser, addPatientEntry);

export default router;
