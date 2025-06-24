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
      return response.status(401).json({
        error: 'username or password missing'
      });
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