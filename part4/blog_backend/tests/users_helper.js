const User = require("../models/user");
const bcrypt = require('bcrypt');

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    passwordHash: bcrypt.hashSync('rahasia', 10)
  },
  {
    username: 'erliansyah',
    name: 'Erliansyah',
    passwordHash: bcrypt.hashSync('himitsu', 10)
  },
  {
    username: 'takahashi',
    name: 'Takahashi',
    passwordHash: bcrypt.hashSync('naisho', 10)
  }
];

const getUsers = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

const getUserId = async () => {
  const user = await User.findOne({ username: 'himumi' });
  return user._id.toString();
};

module.exports = {
  getUsers,
  initialUsers,
  getUserId
};