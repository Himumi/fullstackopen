import { Router, Response } from "express";
import { PatientEntryWithoutSsn } from "../types";
import { getPatients } from "../services/patientServices";

const router = Router();

router.get('/', (_request, response: Response<PatientEntryWithoutSsn[]>) => {
  response.status(200).json(getPatients());
});

export default router;
