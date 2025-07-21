const Author = require("../models/author");
const Book = require("../models/book");

const { hasValueTaken, isValueLengthValid, isLoggedIn } = require("./helper");

const isTitleLengthValid = isValueLengthValid(
  5,
  "title length must be 5 letters or more",
);
const hasBookTaken = hasValueTaken(Book, "title has taken");

const addBook = async (root, args, context) => {
  // Validators
  isTitleLengthValid(args.title);
  hasBookTaken(args.title);
  isLoggedIn(context.currentUser);

  const author = await Author.findOne({ name: args.author });

  const book = new Book({
    ...args,
    author: author._id,
  });

  await book.save();

  return await Book.findById(book._id).populate("author");
};

module.exports = {
  addBook,
};
