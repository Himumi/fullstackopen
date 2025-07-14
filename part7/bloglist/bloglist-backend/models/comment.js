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

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment