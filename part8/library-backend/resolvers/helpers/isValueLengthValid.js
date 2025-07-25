const graphqlError = require('./graphqlError');

const isValueLengthValid = (length, message) => {
  return (value) => {
    if (value.length < length) {
      graphqlError(message, {
        code: 'BAD_USER_INPUT',
        invalidArgs: value,
      });
    }
  };
};

module.exports = isValueLengthValid;
