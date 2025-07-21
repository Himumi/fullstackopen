const Author = require('../models/author')
const Book = require('../models/book')

const addBook = async (root, args) => {
  const author = await Author.findOne({ name: args.author })

  const book = new Book({
    ...args,
    author: author._id
  })

  await book.save()

  return await Book.findById(book._id).populate('author')
}

module.exports = {
  addBook,
}