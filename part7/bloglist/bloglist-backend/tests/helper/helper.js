const User = require('../../models/user')
const Blog = require('../../models/blog')

const usersHelper = require('../users/users_helper')
const blogsHelper = require('../blogs/blogs_helper')

const resetDB = async () => {
  // delete all users and blogs
  await User.deleteMany({})
  await Blog.deleteMany({})

  const users = await User.insertMany(usersHelper.initialUsers)
  const user = users[1]
  const id = user._id.toString()

  const blogs = blogsHelper.initialBlogs.map((e) => {
    return { ...e, user: id }
  })
  const savedBlogs = await Blog.insertMany(blogs)

  const blogsIds = savedBlogs.map((b) => b._id.toString())
  user.blogs = user.blogs.concat(blogsIds)

  await user.save()
}

const removeAllInfo = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
}

module.exports = {
  resetDB,
  removeAllInfo
}
