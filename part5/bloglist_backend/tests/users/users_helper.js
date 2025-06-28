const User = require('../../models/user');
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

const rootLogin = {
  username: 'root',
  password: 'rahasia'
};

let token = null;

const setToken  = text => {
  token = text;
};

const getToken = () => token;

const getUsers = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

const getUserId = async () => {
  const user = await User.findOne({ username: 'erliansyah' });
  return user._id.toString();
};

const resetDB = async () => {
  await User.deleteMany({});
  await User.insertMany(initialUsers);
};

module.exports = {
  getUsers,
  initialUsers,
  getUserId,
  resetDB,
  rootLogin,
  setToken,
  getToken,
};