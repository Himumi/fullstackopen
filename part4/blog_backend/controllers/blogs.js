const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

const getBlogsHandler = (request, response) => {
  Blog
    .find({})
    .then(blogs => response.json(blogs));
};

const createBlogHandler = (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => response.status(201).json(result));
};

blogsRouter.get('/', getBlogsHandler);
blogsRouter.post('/', createBlogHandler);

module.exports = blogsRouter;