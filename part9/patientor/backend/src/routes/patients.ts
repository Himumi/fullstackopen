import { Router, Response } from "express";
import { PatientEntryWithoutSsn } from "../types";
import { getPatients } from "../services/patients";

const router = Router();

router.get('/', (_request, response: Response<PatientEntryWithoutSsn[]>) => {
  response.status(200).json(getPatients());
});

export default router;
