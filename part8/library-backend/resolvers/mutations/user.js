require('dotenv').config();

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const hasValueTaken = require('../helpers/hasValueTaken');
const isValueLengthValid = require('../helpers/isValueLengthValid');
const graphqlError = require('../helpers/graphqlError');

const isUsernameLengthValid = isValueLengthValid(
  5,
  'username must be 5 letters or more',
);
const hasUserTaken = hasValueTaken(User, 'Username has taken');

// Mutations

const createUser = async (root, args) => {
  // Validators
  isUsernameLengthValid(args.username);
  hasUserTaken(args.username);

  const user = new User({
    username: args.username,
    favoriteGenre: args.favoriteGenre,
  });

  return await user.save();
};

const login = async (root, args) => {
  const user = await User.findOne({ username: args.username });

  if (!user || args.password !== 'secret') {
    graphqlError({
      message: 'wrong credentials',
      code: 'BAD_USER_INPUT',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
};

module.exports = {
  createUser,
  login,
};
