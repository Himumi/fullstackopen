const { GraphQLError } = require('graphql')

const graphqlError = (error) => {
  throw new GraphQLError(error.message, {
    extensions: {
      code: error.code,
      invalidArgs: error.invalidArgs,
      error: error.error,
    }
  })
}

const hasValueTaken = (model, message) => {
  return async (value) => {
    const hasTaken = async (value) => {
      const data = await model.findOne({ value })
      return !data
    }

    if (!hasTaken(value)) {
      graphqlError({
        message,
        code: 'BAD_USER_INPUT',
        invalidArgs: value,
      })
    }
  }
}

const isValueLengthValid = (length, message) => {
  return (value) => {
    if (value.length < length) {
      graphqlError({
        message,
        code: 'BAD_USER_INPUT',
        invalidArgs: value
      })
    }
  }
}

module.exports = {
  hasValueTaken,
  isValueLengthValid,
}