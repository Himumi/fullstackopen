const { bookCount } = require("../queries/books");

module.exports = {
  Query: {
    bookCount: bookCount,
  }
}