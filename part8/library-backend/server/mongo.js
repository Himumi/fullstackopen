require('dotenv').config();

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

const mongo = () => {
  console.log('connecting to MongoDB');
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('failed to connecting to MongoDB:', error));
};

module.exports = mongo;
