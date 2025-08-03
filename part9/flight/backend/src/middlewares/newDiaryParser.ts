import { Request, Response, NextFunction } from "express";
import { NewEntrySchema } from "../types";

const newDiaryParser = (request: Request, _response: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(request.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newDiaryParser;
