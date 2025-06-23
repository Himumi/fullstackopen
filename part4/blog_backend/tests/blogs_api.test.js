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

  test('creates blog when data is correct', async () => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 0
    };

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    
    const blogsAtEnd = await helper.getBlogs();
    const titles = blogsAtEnd.map(note => note.title);

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    assert(titles.includes(result.body.title));

  });

  after(async () => mongoose.connection.close());
});