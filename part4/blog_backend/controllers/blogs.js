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

const createBlogHandler = (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => response.status(201).json(result))
    .catch(error => {
      response.status(400).json({ error });
    });
};

blogsRouter.get('/', getBlogsHandler);
blogsRouter.post('/', createBlogHandler);

module.exports = blogsRouter;