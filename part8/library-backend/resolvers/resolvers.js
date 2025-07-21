const authorQueries = require("../queries/authors");
const bookQueries = require("../queries/books");

module.exports = {
  Query: {
    bookCount: bookQueries.bookCount,
    allBooks: bookQueries.allBooks,
    authorCount: authorQueries.authorCount,
    allAuthors: authorQueries.allAuthors,
  }
}