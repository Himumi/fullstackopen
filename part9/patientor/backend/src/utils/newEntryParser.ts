import { NextFunction, Request, Response } from 'express';
import { NewEntrySchema } from '../types';

export const newEntryParser = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    NewEntrySchema.parse(request.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
