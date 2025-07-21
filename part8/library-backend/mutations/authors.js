const Author = require('../models/author')

const editAuthor = async (root, args) => {
  const author = await Author.findOne({ name: args.name })
  author.born = args.setBornTo

  return author.save()
}

module.exports = {
  editAuthor,
}