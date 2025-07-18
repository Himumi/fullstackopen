require('dotenv').config()

const jwt = require('jsonwebtoken')

const logger = require('./logger')
const User = require('../models/user')

// request logger handler (middleware)
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

// unknown end point handler (middleware)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// token extractor handler and helper functions
const getToken = (request) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// token extractor handler (middleware)
const tokenExtractor = (request, response, next) => {
  // SKIP middleware
  if (request.method === 'GET') {
    return next()
  }

  request.token = getToken(request)

  next()
}

// user extractor helper functions
const decodeToken = (token) => jwt.verify(token, process.env.SECRET)
const invalidTokenErrorMsg = () => new Object({ name: 'JsonWebToken' })
const invalidUserIdErrorMsg = () =>
  new Object({
    name: 'InvalidUserId',
    message: 'missing or invalid user id'
  })

// user extractor handler (middleware)
const userExtractor = async (request, response, next) => {
  // SKIP middleware
  if (request.method === 'GET') {
    return next()
  }

  const decodedToken = decodeToken(request.token)

  if (!decodedToken.id) {
    return next(invalidTokenErrorMsg())
  }

  const user = await User.findById(decodedToken.id)

  // validate user
  if (!user) {
    return next(invalidUserIdErrorMsg())
  }

  // add user to request in raw form (_id, _v, etc)
  request.user = user

  next()
}

// conditional functions
const castError = (error) => error.name === 'CastError'
const validationError = (error) => error.name === 'ValidationError'
const duplicatedError = (error) =>
  error.name === 'MongoServerError' &&
  error.message.includes('E11000 duplicate key error')
const jwtError = (error) => error.name === 'JsonWebTokenError'
const tokenExpiredError = (error) => error.name === 'TokenExpiredError'
const invalidUserIdError = (error) => error.name === 'InvalidUserId'
const invalidAuthorizationError = (error) =>
  error.name === 'InvalidAuthorization'

// error handler (middleware)
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  switch (true) {
    case castError(error): {
      return response.status(400).json({
        error: 'malformatted id'
      })
    }
    case validationError(error): {
      return response.status(400).json({
        error: error.message
      })
    }
    case duplicatedError(error): {
      return response.status(400).json({
        error: 'User validation failed: username: username must be unique'
      })
    }
    case invalidUserIdError(error): {
      console.log(error)
      return response.status(400).json({
        error: error.message
      })
    }
    case invalidAuthorizationError(error): {
      return response.status(401).json({
        error: error.message
      })
    }
    case jwtError(error): {
      return response.status(401).json({
        error: 'invalid token'
      })
    }
    case tokenExpiredError(error): {
      return response.status(401).json({
        error: 'expired token'
      })
    }
    default: {
      return next(error)
    }
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
