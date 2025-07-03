const router = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

const resetHandler = async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
};

router.post('/reset', resetHandler);

module.exports = router;
