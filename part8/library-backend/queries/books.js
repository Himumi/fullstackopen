const Book = require("../models/book");
const Author = require("../models/author");

// Helpers
const findBooks = async (query) => Book.find(query).populate("author");
const findAuthor = async (query) => Author.findOne(query);

const bookCount = async () => Book.collection.countDocuments();

const allBooks = async (root, args) => {
  switch (false) {
    case !(args.author && args.genre): {
      const author = await findAuthor({ name: args.author });
      return findBooks({
        author: author._id,
        genres: { $in: [args.genre] },
      });
    }
    case !args.author: {
      const author = await findAuthor({ name: args.author });
      return findBooks({ author: author._id });
    }
    case !args.genre:
      return findBooks({ genres: { $in: [args.genre] } });
    default:
      return findBooks({});
  }
};

const getGenres = async () => {
  const books = await Book.find({});
  const genres = books.reduce((accu, book) => {
    const genres = new Set(book.genres);
    return accu.union(genres);
  }, new Set());

  return [...genres];
};

module.exports = {
  bookCount,
  allBooks,
  getGenres,
};
