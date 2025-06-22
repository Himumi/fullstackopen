const express = require('express');

const blogsRouter = require('./controllers/blogs');
const Blog = require('./models/blog');
const logger = require('./utils/logger');

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/blogs', blogsRouter);

const PORT = 3003;
app.listen(
  PORT, 
  () => logger.info(`Server running on port ${PORT}`)
);