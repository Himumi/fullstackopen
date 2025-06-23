const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../utils/config');

const MONGODB_URI = config.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info('connected to DB'))
  .catch(error => 
    logger.error('something happened with DB connection', error)
  );

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

blogSchema.set('toJSON', { 
  transform: (document, returned) => {
    returned.id = returned._id.toString(),
    delete returned._id;
    delete returned.__v;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;