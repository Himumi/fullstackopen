const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

const MONGODB_URI = config.MONGODB_URI
mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info('connected to DB'))
  .catch((error) =>
    logger.error('something happened with DB connection', error)
  )

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
