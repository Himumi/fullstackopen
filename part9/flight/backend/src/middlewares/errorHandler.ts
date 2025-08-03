import { Response, Request, NextFunction } from "express";
import { z } from 'zod';

export const ZodErrorHandler = (error: unknown, _request: Request, response: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    response.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
