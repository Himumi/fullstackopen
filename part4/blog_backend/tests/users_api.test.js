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

    test('fails when username or password missing', async () => {
      const usersAtBegin = await helper.getUsers();

      const newUser = {
        username: 'himumi',
        name: 'Himumi',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.getUsers();

      assert.strictEqual(usersAtEnd.length, usersAtBegin.length);
      assert.strictEqual(result.body.error, 'username or password missing');
    });

    test.only('fails when username less than 3 chars', async () => {
      const usersAtBegin = await helper.getUsers();

      const newUser = {
        username: 'hm',
        name: 'Himumi',
        password: 'himitsu'
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)

      const usersAtEnd = await helper.getUsers();
      assert.strictEqual(usersAtEnd.length, usersAtBegin.length);
      assert(result.body.error.includes('less than 3 chars'));
    });

    test.only('fails when password less than 3 chars', async () => {
      const usersAtBegin = await helper.getUsers();

      const newUser = {
        username: 'himumi',
        name: 'Himumi',
        password: 'h'
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)

      const usersAtEnd = await helper.getUsers();
      assert.strictEqual(usersAtEnd.length, usersAtBegin.length);
      assert(result.body.error.includes('less than 3 chars'));
    });
  });

  describe('getUsersHandler', () => {
    test('succeeds fetching all users', async () => {
      const usersAtBegin = await helper.getUsers();

      const result = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      assert.strictEqual(result.body.length, usersAtBegin.length);
    });
  });
});

after(async () => await mongoose.connection.close());