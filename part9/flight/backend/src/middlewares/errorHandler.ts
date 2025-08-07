import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { NewDiaryEntry, Visibility, Weather } from '../types';

export const ZodErrorHandler = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    const body = request.body as NewDiaryEntry;
    const errorMessages = error.issues.map((i) => {
      const path = i.path[0] as Visibility | Weather;
      const incorrectPart = Object.getOwnPropertyDescriptor(body, path);
      return `Error: Incorrect ${path}: ${incorrectPart?.value}`;
    });

    response
      .status(400)
      .send({ error: 'Bad User input', message: errorMessages });
  } else {
    next(error);
  }
};
