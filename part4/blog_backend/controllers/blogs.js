const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

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
    const body = request.body;
    const user = await User.findById(body.userId);

    if (!user) {
      return response.status(400).json({ 
        error: 'userId missing or invalid'
      });
    }

    const blog = new Blog({
      title: body.title,
      author: body.title,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

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