const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app')
const helper = require('./blogs_helper');
const { log } = require('node:console');
const { update } = require('lodash');

const api = supertest(app);

describe('blogs api', () => {
  beforeEach(async () => await helper.resetDB());

  describe('getNoteshandler', () => {
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
  });

  describe('createNoteHandler', () => {
    test('returns status 400 when data is incorrect', async () => {
      const newBlog = { 
        title: 'test title',
        author: 'test author',
        likes: 0
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
    });

    test('does not create blog when data is incorrect', async () => {
      const newBlog = { 
        title: 'test title',
        author: 'test author',
        likes: 0
      };

      await api
        .post('/api/blogs')
        .send(newBlog);

      const blogsAtEnd = await helper.getBlogs();
      const titles = blogsAtEnd.map(blog => blog.title);

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
      assert(!titles.includes(newBlog.title));
    });

    test('creates blog with likes 0 when likes property is missing', async () => {
      const newBlog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
      };

      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.getBlogs();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
      assert.strictEqual(result.body.likes, 0);
    });
  });

  describe('deleteNoteHandler', () => {
    test('succeeds deleting Blog if id is correct', async () => {
      const blogsAtBegin = await helper.getBlogs();
      const id = blogsAtBegin[0]._id;

      await api
        .delete(`/api/blogs/${id}`)
        .expect(204);

      const blogsAtEnd = await helper.getBlogs();
      assert.strictEqual(blogsAtEnd.length, blogsAtBegin.length - 1);
    });
  });

  describe('updateBlogHandler', () => {
    test('succeeds and returns updated blog', async () => {
      const blogsAtBegin = await helper.getBlogs();
      const blog = blogsAtBegin[0];

      const updateBlog = { 
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1 
      };

      const result = await api
        .put(`/api/blogs/${blog._id}`)
        .send(updateBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(result.body.likes, blog.likes + 1);
    });
  });
});

after(async () => await mongoose.connection.close());