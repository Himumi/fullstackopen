const authorQueries = require('./queries/authors');
const bookQueries = require('./queries/books');
const userQueries = require('./queries/user');

const bookMutation = require('./mutations/books');
const authorMutation = require('./mutations/authors');
const userMutation = require('./mutations/user');

module.exports = {
  Query: {
    ...authorQueries,
    ...bookQueries,
    ...userQueries,
  },
  Mutation: {
    ...bookMutation,
    ...authorMutation,
    ...userMutation,
  },
};
