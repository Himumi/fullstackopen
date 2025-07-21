const { GraphQLError } = require('graphql')
const User = require('../models/user')

const { hasValueTaken, isValueLengthValid } = require('./helper')

const isUsernameLengthValid = isValueLengthValid(5, 'username must be 5 letters or more')
const hasUserTaken = hasValueTaken(User, 'Username has taken')

const createUser = async (root, args) => {
  // Validators
  isUsernameLengthValid(args.username)
  hasUserTaken(args.username)

  const user = new User({ 
    username: args.username,
    favoriteGenre: args.favoriteGenre
  })

  return await user.save()
}

module.exports = {
  createUser,
}