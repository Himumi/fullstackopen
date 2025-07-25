const graphqlError = require('./graphqlError');

const hasValueTaken = (model, message) => {
  return async (value) => {
    const hasTaken = async (value) => {
      const data = await model.findOne({ value });
      return !data;
    };

    if (!hasTaken(value)) {
      graphqlError(message, {
        code: 'BAD_USER_INPUT',
        invalidArgs: value,
      });
    }
  };
};

module.exports = hasValueTaken;
