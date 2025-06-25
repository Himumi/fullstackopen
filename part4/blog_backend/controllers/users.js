const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const isMinLengthInvalid = (...params) => params.some(e => e.length < 3);
const isMissing = (...params) => params.some(e => !e);

const missingErrorMsg = (username, password) => {
  const fieldName = username ? 'username' : 'password';
  const errorMsg = `User validation failed: ${fieldName}: ${fieldName} is required`;
  return { name: 'ValidationError', message: errorMsg };
};
const invalidLengthErrorMsg = (username, password) => {
   const fieldName = username.length < 3 ? 'username' : 'password';
   const errorMsg = `User validation failed: ${fieldName}: ${fieldName} less than 3 chars`;
   return { name: 'ValidationError', message: errorMsg };
};

// routes handlers
const getUsersHandler = async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, author: 1, url: 1, id: 1 });
    response.json(users);
  } catch (error) {
    next(error);
  }
};

const createUserHandler = async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (isMissing(username, password)) {
      return next(missingErrorMsg(username, password));
    }

    if (isMinLengthInvalid(username, password)) {
      return next(invalidLengthErrorMsg(username, password));
    }

    // creating passwordHash with bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    }); 

    const savedUser = await user.save();
    response
      .status(201)
      .json(savedUser);
  } catch (error) {
    next(error);
  }
};

// routes
usersRouter.get('/', getUsersHandler);
usersRouter.post('/', createUserHandler);

module.exports = usersRouter;