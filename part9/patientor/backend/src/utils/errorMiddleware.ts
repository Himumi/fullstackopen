import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const errorMiddleware = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    // Transform error messages
    const messages = error.issues.map((e) => {
      // Get invalid property
      const prop = String(e.path[0]);
      // Get invalid property value from request.body
      const descriptor = Object.getOwnPropertyDescriptor(request.body, prop);

      return `Value of ${prop}: ${descriptor?.value}`;
    });

    response.status(400).send({ error: 'Bad_User_input', messages });
  } else {
    next(error);
  }
};
