const router = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

const resetHandler = async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  response.status(204).end();
};

router.post('/', resetHandler);

module.exports = router;
