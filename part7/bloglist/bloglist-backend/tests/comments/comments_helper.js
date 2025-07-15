const Comment = require('../../models/comment')
const Blog = require('../../models/blog')

const blogsHelper = require('../blogs/blogs_helper')

const initialComments = [
  {
    content: 'good blogs',
  },
  {
    content: 'perfect blogs'
  },
  {
    content: 'bad blogs'
  }
]

const newComment = {
  content: 'testing comment'
}

const getComments = async () => {
  return await Comment.find({})
}

const nonExistingId = async () => {
  const comment = new Comment({
    content: 'non existing comment'
  })

  await comment.save()
  await comment.deleteOne()

  return comment._id
}

const resetDB = async () => {
  await blogsHelper.resetDB()
  await Comment.deleteMany({})

  const blog = await Blog.findOne({ title: 'Type wars' })
  
  const comments = initialComments.map(comment => {
    return { ...comment, blog: blog._id.toString() }
  })
  const savedComments = await Comment.insertMany(comments)

  const commentIds = savedComments.map(comment => comment._id.toString())
  blog.comments = blog.comments.concat(commentIds)

  await blog.save()
}

const removeAllInfo = async () => {
  await blogsHelper.removeAllInfo()
  await Comment.deleteMany({})
}

module.exports = {
  initialComments,
  newComment,
  resetDB,
  getComments,
  nonExistingId,
  removeAllInfo,
}