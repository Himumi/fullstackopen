const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

const getToken = request => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

const decodeToken = (token) => jwt.verify(token, process.env.SECRET);
const invalidTokenError = () => new Object({ name: 'JsonWebToken' });
const invalidUserIdError = () => new Object({ 
    name: 'InvalidUserId',
    message: 'missing or invalid user id' 
});
const invalidAuthorizationError = () => new Object({
  name: 'InvalidAuthorization',
  message: 'invalid authorization' 
});

const getBlogsHandler = async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1, id: 1 });

    response.json(blogs);
  } catch (error) {
    next(error);
  }
};

const createBlogHandler = async (request, response, next) => {
  try {
    const body = request.body;
    const decodedToken = decodeToken(request.token);
    if (!decodedToken.id) {
      return next(invalidTokenError());
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return next(invalidUserIdError());
    }

    const blog = new Blog({
      ...body,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

const deleteBlogHandler = async (request, response, next) => {
  try {
    const decodedToken = decodeToken(request.token);
    if (!decodedToken.id) {
      return next(invalidTokenError());
    }
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return next(invalidUserIdError());
    }

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== user._id.toString()) {
      return next(invalidAuthorizationError());
    }

    await blog.deleteOne();
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