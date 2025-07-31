import { Router, Request, Response } from 'express';
import {
  NewPatientEntry,
  PatientEntry,
  PatientEntryWithoutSsn,
} from '../types';
import patientServices from '../services/patients';
import { newPatientParser } from '../utils/newPatientParser';

const router = Router();

const getPatients = (
  _request: Request,
  response: Response<PatientEntryWithoutSsn[]>
) => {
  const patients = patientServices.getPatients();
  response.json(patients);
};

const addPatient = (
  request: Request<unknown, unknown, NewPatientEntry>,
  response: Response<PatientEntry>
) => {
  const addedPatient = patientServices.addPatient(request.body);
  response.json(addedPatient);
};

router.get('/', getPatients);
router.post('/', newPatientParser, addPatient);

export default router;
