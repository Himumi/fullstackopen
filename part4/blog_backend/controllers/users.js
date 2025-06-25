const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// routes handlers
const getUsersHandler = async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    next(error);
  }
};

const createUserHandler = async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (!username || !password) {
      const fieldName = username ? 'username' : 'password';
      const error = `User validation failed: ${fieldName}: ${fieldName} is required`;
      return response.status(400).json({ error });
    }

    if (username.length < 3 || password.length < 3) {
      const fieldName = username.length < 3 ? 'username' : 'password';
      const error = `User validation failed: ${fieldName}: ${fieldName} less than 3 chars`;
      return response.status(400).json({ error });
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