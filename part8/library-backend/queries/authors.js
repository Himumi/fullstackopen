const Author = require('../models/author')

const authorCount = () => Author.collection.countDocuments()

module.exports = {
  authorCount,
}