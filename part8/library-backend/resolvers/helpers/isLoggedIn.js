const graphqlError = require('./graphqlError');

const isLoggedIn = (user) => {
  if (!user) {
    graphqlError(message, {
      code: 'BAD_USER_INPUT',
    });
  }
};

module.exports = isLoggedIn;
