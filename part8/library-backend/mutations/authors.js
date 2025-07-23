const Author = require('../models/author');
const { isLoggedIn } = require('./helper');

const editAuthor = async (root, args, context) => {
  isLoggedIn(context.currentUser);

  const author = await Author.findOne({ name: args.name });
  author.born = args.setBornTo;

  return author.save();
};

module.exports = {
  editAuthor,
};
