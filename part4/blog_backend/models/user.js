const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
    minLength: [3, 'username less than 3 chars'],
  },
  name: String,
  passwordHash: {
    type: String,
    required: [true, 'password is required'],
    minLength: [3, 'password less than 3 chars']
  },
});

userSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.__v;
    delete returned.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;