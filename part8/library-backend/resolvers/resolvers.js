const authorQueries = require("../queries/authors");
const bookQueries = require("../queries/books");
const userQuery = require("../queries/user");

const bookMutation = require("../mutations/books");
const authorMutation = require("../mutations/authors");
const userMutation = require("../mutations/user");

module.exports = {
  Query: {
    bookCount: bookQueries.bookCount,
    allBooks: bookQueries.allBooks,
    authorCount: authorQueries.authorCount,
    allAuthors: authorQueries.allAuthors,
    me: userQuery.me,
  },
  Mutation: {
    addBook: bookMutation.addBook,
    editAuthor: authorMutation.editAuthor,
    createUser: userMutation.createUser,
    login: userMutation.login,
  },
};
