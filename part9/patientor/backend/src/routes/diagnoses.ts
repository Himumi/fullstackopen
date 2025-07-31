import { Response, Router } from 'express';
import { getDiagnoses } from '../services/diagnoses';
import { DiagnoseEntry } from '../types';

const router = Router();

router.get('/', (_request, response: Response<DiagnoseEntry[]>) => {
  response.send(getDiagnoses());
});

export default router;
