const Book = require('../models/book')

const bookCount = () => Book.collection.countDocuments()

module.exports = {
  bookCount,
}