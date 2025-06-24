const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String
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