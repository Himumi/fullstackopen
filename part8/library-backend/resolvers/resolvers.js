const authorQueries = require("../queries/authors");
const bookQueries = require("../queries/books");

module.exports = {
  Query: {
    bookCount: bookQueries.bookCount,
    authorCount: authorQueries.authorCount,
  }
}