import express, { Request, Response } from 'express';
import diaryService from '../services/diaryService';

import {
  NonSensitiveDiaryEntry,
  NewDiaryEntry,
  DiaryEntry
} from '../types';
import newDiaryParser from '../middlewares/newDiaryParser';

const router = express.Router();

const getDiaries = (
  _request: Request,
  response: Response<NonSensitiveDiaryEntry[]>
) => {
  response.send(diaryService.getNonSensitiveEntries());
};

const getDiary = (
  request: Request,
  response: Response<NonSensitiveDiaryEntry>
) => {
  const diary = diaryService.findById(Number(request.params.id));

  if (diary) {
    response.status(200).json(diary);
  } else {
    response.sendStatus(404);
  }
};

const addDiary = (
  request: Request<unknown, unknown, NewDiaryEntry>,
  response: Response<DiaryEntry>
) => {
  const addedEntry = diaryService.addDiary(request.body);
  response.json(addedEntry);
};

router.get('/', getDiaries);
router.get('/:id', getDiary);
router.post('/', newDiaryParser, addDiary);

export default router;
