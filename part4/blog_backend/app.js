const express = require('express');

const Blog = require('./models/blog');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

const app = express();

// Middlewares
app.use(express.json());
app.use(middleware.errorHandler);

// Routes
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

// middlewares
app.use(middleware.errorHandler);

module.exports = app;