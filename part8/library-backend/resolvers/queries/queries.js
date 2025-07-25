const authors = require('./authors');
const books = require('./books');
const user = require('./user');

const queries = {
  ...authors,
  ...books,
  ...user,
};

module.exports = queries;
