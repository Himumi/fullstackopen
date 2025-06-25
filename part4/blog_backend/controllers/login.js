require('dotenv').config();

const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const isPasswordCorrect = async (password, userObject) => {
  return userObject === null
    ? false
    : await bcrypt.compare(password, passwordHash);
};
const invalidLoginInfoMsg = 'invalid username or password';

const loginHandler = async (request, response, next) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ username });

    if (!(user && isPasswordCorrect(password, user))) {
      return response.status(401).json({
        error: invalidLoginInfoMsg
      });
    }

    const dataForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(dataForToken, process.env.SECRET); 

    response
      .status(200)
      .json({ token,
        username: user.username, 
        name: user.name 
      });
  } catch (error) {
    next(error);
  } 
};

loginRouter.post('/', loginHandler);

module.exports = loginRouter;