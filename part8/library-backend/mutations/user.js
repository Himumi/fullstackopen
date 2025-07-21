const { GraphQLError } = require('graphql')
const User = require('../models/user')

const isLengthValid = (username) => {
  if (username.length < 5) {
    throw new GraphQLError('username must be 5 letters or more', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: username
      }
    })
  }
}

const hasUserTaken = (username) => {
  const hasTaken = async (username) => {
    const user = await User.findOne({ username })
    console.log(!user)
    return !user
  }

  if (!hasTaken(username)) {
    throw new GraphQLError('username has taken', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: username
      }
    })
  }
}

const createUser = async (root, args) => {
  isLengthValid(args.username)
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