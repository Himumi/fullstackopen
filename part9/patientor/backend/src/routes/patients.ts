import { Router, Request, Response } from 'express';
import {
  NewPatientEntry,
  PatientEntry,
  PatientEntryWithoutSsn,
} from '../types';
import patientServices from '../services/patients';
import { newPatientParser } from '../utils/newPatientParser';

const router = Router();

router.get('/', (_request, response: Response<PatientEntryWithoutSsn[]>) => {
  response.status(200).json(patientServices.getPatients());
});

const addPatient = (
  request: Request<unknown, unknown, NewPatientEntry>,
  response: Response<PatientEntry>
) => {
  const addedPatient = patientServices.addPatient(request.body);
  response.json(addedPatient);
};

router.post('/', newPatientParser, addPatient);

export default router;
