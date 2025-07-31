import { Router, Response } from "express";
import { PatientEntryWithoutSsn } from "../types";
import { addPatient, getPatients } from "../services/patients";
import toNewPatientEntry from "../utils/toNewPatientEntry";

const router = Router();

router.get('/', (_request, response: Response<PatientEntryWithoutSsn[]>) => {
  response.status(200).json(getPatients());
});

router.post('/', (request, response) => {
  try {
    const newPatient = toNewPatientEntry(request.body);
    const addedPatient = addPatient(newPatient);

    response.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong:';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }

    response.status(404).send(errorMessage);
  }
});

export default router;
