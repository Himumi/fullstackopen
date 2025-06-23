const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app')
const helper = require('./blogs_helper');

const api = supertest(app);

describe('blog router', async () => {
  beforeEach(async () => await helper.resetDB());

  test('api returns all notes', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(result.body.length, helper.initialBlogs.length);
  });

  test('returned blogs with id property instead _id', async () => {
    const result = await api.get('/api/blogs');
    const blog = result.body[0];

    assert(blog.hasOwnProperty('id'));
    assert(!blog.hasOwnProperty('_id'));
  });

  after(async () => mongoose.connection.close());
});