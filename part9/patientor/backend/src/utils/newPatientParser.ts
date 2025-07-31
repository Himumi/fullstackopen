import { Request, Response, NextFunction } from 'express';
import { NewPatientSchema } from '../types';

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
