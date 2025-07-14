const commentsRouter = require('express').Router()

const Comment = require('../models/comment')
const Blog = require('../models/blog')

const createBlogCommentHandler = async (request, response, next) => {
  try {
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)
    const { content } = request.body

    const comment = new Comment({
      content,
      blog: blog._id
    })
    savedComment = await comment.save()

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).json(comment)
  } catch (error) {
    next(error)
  }
}

commentsRouter.post('/:id/comments', createBlogCommentHandler)

module.exports = commentsRouter