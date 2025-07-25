const Author = require('../../models/author');
const Book = require('../../models/book');

const hasValueTaken = require('../helpers/hasValueTaken');
const isValueLengthValid = require('../helpers/isValueLengthValid');
const isLoggedIn = require('../helpers/isLoggedIn');

const isTitleLengthValid = isValueLengthValid(
  5,
  'title length must be 5 letters or more',
);
const hasBookTaken = hasValueTaken(Book, 'title has taken');

// Mutations

const addBook = async (root, args, context) => {
  // Validators
  isTitleLengthValid(args.title);
  hasBookTaken(args.title);
  isLoggedIn(context.currentUser);

  const book = new Book({
    ...args,
  });

  const author = await Author.findOne({ name: args.author });
  console.log(author);

  if (author) {
    book.author = author._id;
  } else {
    const newAuthor = new Author({
      name: args.author,
    });
    const savedAuthor = await newAuthor.save();
    book.author = savedAuthor._id;
  }

  await book.save();

  return await Book.findById(book._id).populate('author');
};

module.exports = {
  addBook,
};
