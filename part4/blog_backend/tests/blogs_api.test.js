const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app')
const helper = require('./blogs_helper');

const api = supertest(app);

describe('blog router', async () => {
  beforeEach(async () => await helper.resetDB());

  test.only('api returns all notes', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(result.body.length, helper.initialBlogs.length);
  });

  after(async () => mongoose.connection.close());
});