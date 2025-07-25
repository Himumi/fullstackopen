const authors = require('./authors');
const books = require('./books');
const user = require('./user');

const mutations = {
  ...authors,
  ...books,
  ...user,
};

module.exports = mutations;
