const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

const getBlogsHandler = async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
};

const createBlogHandler = async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    const savedBlog = await blog.save();
    response
      .status(201)
      .json(savedBlog);
  } catch (error) {
    next(error);
  }
};

const deleteBlogHandler = async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateBlogHandler = async (request, response, next) => {
  try {
    const id = request.params.id;
    const opts = {
      new: true,
      runValidators: true
    };

    const result = await Blog.findByIdAndUpdate(id, request.body, opts);
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

blogsRouter.get('/', getBlogsHandler);
blogsRouter.post('/', createBlogHandler);
blogsRouter.delete('/:id', deleteBlogHandler);
blogsRouter.put('/:id', updateBlogHandler);

module.exports = blogsRouter;