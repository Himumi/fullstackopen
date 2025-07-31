import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const errorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    response.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
