import { Router, Response } from "express";
import { DiagnoseEntry } from "../types";
import { getDiagnoses } from "../services/diagnoses";

const router = Router();

router.get('/', (_request, response: Response<DiagnoseEntry[]>) => {
  response.send(getDiagnoses());
});


export default router;
