const Book = require("../models/book");
const Author = require("../models/author");

// Helpers
const findBooks = async (query) => Book.find(query).populate("author");
const findAuthor = async (query) => Author.findOne(query);

<<<<<<< HEAD
const bookCount = () => Book.collection.countDocuments()
=======
const bookCount = async () => Book.collection.countDocuments();
>>>>>>> 52e0bc9 (add semicolons by using prettier & create .prettierignore files)

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

module.exports = {
  bookCount,
  allBooks,
};
