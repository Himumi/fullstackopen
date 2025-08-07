import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorMiddleware = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    response.status(400).send({
      error: 'Bad_User_input',
      messages: transformZodError(error, request),
    });
  } else {
    next(error);
  }
};

// Helpers
const transformZodError = (error: ZodError, request: Request): string[] => {
  return error.issues.map(({ path }) => {
    // Get property and descriptor
    const prop = String(path[0]);
    const descriptor = getDescriptor(request.body, prop);

    // One level deep path
    if (!isObject(descriptor?.value)) {
      return `Value of ${prop}: ${descriptor?.value}`;
    }

    // Deeper path
    const deepProp = String(path[1]);
    const deepDescritor = getDescriptor(descriptor?.value, deepProp);

    return `Value of ${prop}: ${deepProp}: ${deepDescritor?.value}`;
  });
};

const isObject = (object: unknown) => {
  return typeof object === 'object';
};
const getDescriptor = Object.getOwnPropertyDescriptor;
