import { NextFunction, Request, Response } from 'express';
import { NewEntrySchema, NewPatientSchema } from '../types';

export const newPatientParser = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    NewPatientSchema.parse(request.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

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
