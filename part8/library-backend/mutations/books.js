const { GraphQLError } = require('graphql')
const Author = require('../models/author')
const Book = require('../models/book')

const isTitleLengthValid = (title) => {
  if (title.length < 5) {
    throw new GraphQLError('title length must be more than 5 letters', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: args.title,
      }
    })
  }
}

const isTitleUnique = (title) => {
  const isBookExisted = async (title) => {
    const book = await Book.find({}) 
    return book.map(b => b.title).includes(title)
  } 

  if (isBookExisted(title)) {
    throw new GraphQLError('Title must be unique', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: args.title,
      }
    })
  }
}

const addBook = async (root, args) => {
  // Validator
  isTitleLengthValid(args.title)
  isTitleUnique(args.title)

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