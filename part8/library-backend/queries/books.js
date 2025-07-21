const Book = require('../models/book')

const bookCount = async () => Book.collection.countDocuments()

module.exports = {
  bookCount,
}