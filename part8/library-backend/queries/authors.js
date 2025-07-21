const _ = require('lodash');
const Author = require('../models/author');
const Book = require('../models/book');

const authorCount = async () => Author.collection.countDocuments();

const allAuthors = async () => {
  const books = await Book.find({}).populate('author');
  const countBook = _.countBy(books, (book) => book.author.name);
  const authors = await Author.find({});

  return authors.map((author) => {
    author.bookCount = countBook[author.name];
    return author;
  });
};

module.exports = {
  authorCount,
  allAuthors,
};
