const express = require('express');

const blogsRouter = require('./controllers/blogs');
const Blog = require('./models/blog');
const logger = require('./utils/logger');
const config = require('./utils/config');

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/blogs', blogsRouter);

module.exports = app;