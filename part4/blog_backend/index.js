require('dotenv').config();

const express = require('express');
const Blog = require('./models/blog');

const app = express();

const getBlogsHandler = (request, response) => {
  Blog
    .find({})
    .then(blogs => response.json(blogs));
};

const createBlogHandler = (request, response) => {
  console.log(request.body);
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => response.status(201).json(result));
};

app.use(express.json());

app.get('/api/blogs', getBlogsHandler);
app.post('/api/blogs', createBlogHandler);

const PORT = 3003;
app.listen(
  PORT, 
  () => console.log(`Server running on port ${PORT}`)
);