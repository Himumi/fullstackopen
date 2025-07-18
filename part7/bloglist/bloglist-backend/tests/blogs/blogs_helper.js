const Blog = require('../../models/blog')
const User = require('../../models/user')
const usersHelper = require('../users/users_helper')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const newBlog = {
  title: 'test title',
  author: 'test author',
  url: 'test url',
  likes: 0
}

const getBlogs = async () => {
  return await Blog.find({})
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'test',
    author: 'test',
    url: 'test',
    likes: 0
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id
}

const resetDB = async () => {
  await usersHelper.resetDB()
  await Blog.deleteMany({})

  const user = await User.findOne({ username: 'erliansyah' })

  const blogs = initialBlogs.map(blog => {
    return { ...blog, user: user._id.toString() }
  })
  const savedBlogs = await Blog.insertMany(blogs)
  
  const blogIds = savedBlogs.map(blog => blog._id.toString())
  user.blogs = user.blogs.concat(blogIds)

  await user.save()
}

const removeAllInfo = async () => {
  await usersHelper.removeAllInfo()
  await Blog.deleteMany({})
}

module.exports = {
  initialBlogs,
  resetDB,
  getBlogs,
  nonExistingId,
  newBlog,
  removeAllInfo,
}
