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

const deleteBlogHandler = async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(400).end();
  }
};

const updateBlogHandler = async (request, response) => {
  try {
    const id = request.params.id;
    const opts = {
      new: true,
      runValidators: true
    };

    const result = await Blog.findByIdAndUpdate(id, request.body, opts);
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json({ error });
    console.error(error);
  }
};

blogsRouter.get('/', getBlogsHandler);
blogsRouter.post('/', createBlogHandler);
blogsRouter.delete('/:id', deleteBlogHandler);
blogsRouter.put('/:id', updateBlogHandler);

module.exports = blogsRouter;