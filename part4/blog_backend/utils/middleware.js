const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// conditional functions
const castError = error => error.name === 'CastError';
const validationError = error => error.name === 'ValidationError';
const duplicatedError = error => error.name === 'MongoServerError' 
  && error.message.includes('E11000 duplicate key error');
const jwtError = error => error.name === 'JsonWebTokenError';
const tokenExpiredError = error => error.name === 'TokenExpiredError';

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  switch (true) {
    case castError(error): {
      return response.status(400).json({
        error: 'malformatted id'
      });
    }
    case validationError(error): {
      return response.status(400).json({
        error: error.message
      });
    }
    case duplicatedError(error): {
      return response.status(400).json({
        error: 'User validation failed: username: username must be unique'
      });
    }
    case jwtError(error): {
      return response.status(401).json({
        error: 'invalid token'
      });
    }
    case tokenExpiredError(error): {
      return response.status(401).json({
        error: 'expired token'
      });
    }
    default: {
      return next(error);
    }
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
