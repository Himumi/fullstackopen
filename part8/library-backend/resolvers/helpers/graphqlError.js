const { GraphQLError } = require('graphql');

const graphqlError = (message, extensions) => {
  throw new GraphQLError(message, {
    extensions,
  });
};

module.exports = graphqlError;
