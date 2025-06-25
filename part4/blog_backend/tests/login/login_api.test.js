const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');

const supertest = require('supertest');
const mongoose = require('mongoose')

const app = require('../../app');
const { resetDB } = require('../helper/helper');

const api = supertest(app);

describe('loginHandler', () => {
  beforeEach(async () => {
    await resetDB();
  });

  test('succeeds login when all data are correct', async () => {
    const login = {
      username: 'root',
      password: 'rahasia',
    };

    const result = await api
      .post('/api/login')
      .send(login)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(result.body.username, login.username);
  });
});

after(async () => await mongoose.connection.close());