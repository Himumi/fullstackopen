require('dotenv').config()

const nodeEnv = process.env.NODE_ENV

const info = (...params) => {
  if (nodeEnv !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (nodeEnv !== 'test') {
    console.error(...params)
  }
}

module.exports = { info, error }
