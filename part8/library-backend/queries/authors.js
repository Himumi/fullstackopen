const Author = require('../models/author')

const authorCount = () => Author.collection.countDocuments()

const allAuthors = async () => Author.find({})

module.exports = {
  authorCount,
  allAuthors,
}