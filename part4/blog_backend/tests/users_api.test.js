const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = require('../app');
const User = require('../models/user');
const helper = require('./users_helper');

const api = supertest(app);

describe('users api', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('rahasia', 10);
    const user = new User({ username: 'root', name: 'Superuser', passwordHash });

    await user.save();
  });

  describe('createUserHandler', () => {
    test('succeeds creating a new user', async () => {
      const usersAtBegin = await helper.getUsers();

      const newUser = {
        username: 'himumi',
        name: 'Himumi Erliansyah',
        password: 'sangatrahasia'
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      
      const usersAtEnd = await helper.getUsers();
      assert.strictEqual(usersAtEnd.length, usersAtBegin.length + 1);

      const usernames = usersAtEnd.map(u => u.username);
      assert(usernames.includes(newUser.username));
    });
  });
});

after(async () => await mongoose.connection.close());