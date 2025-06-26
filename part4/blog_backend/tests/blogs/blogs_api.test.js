const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app')
const helper = require('./blogs_helper');
const usersHelper = require('../users/users_helper');
const { resetDB } = require('../helper/helper');

const api = supertest(app);

const assertEqual = (latestLength, prevLength) => 
  assert.strictEqual(latestLength, prevLength);

const assertIncludes = (text, target) => 
  assert(text.includes(target));

const assertNotIncludes = (text, target) => 
  assert(!text.includes(target));

const getProperty = (objects, property) => 
  objects.map(o => o[property]);

describe('blogs api', () => {
  let token = null;

  beforeEach(async () => {
    await resetDB();

    const login = await api
      .post('/api/login')
      .send(usersHelper.rootLogin)
      .expect(200);
    
    usersHelper.setToken(login.body.token);
  });

  describe('getBlogshandler', () => {
    test('succeeds returning all notes', async () => {
      const blogs = await helper.getBlogs();
      const result = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${usersHelper.getToken()}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assertEqual(result.body.length, blogs.length);
    });

    test('succeeds fetching note with id property instead _id', async () => {
      const result = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${usersHelper.getToken()}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blog = result.body[0];

      assert(blog.hasOwnProperty('id'));
      assert(!blog.hasOwnProperty('_id'));
    });

    test('succeeds fetching blogs eventhough without token', async () => {
      const blogsAtBegin = await helper.getBlogs();

      const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      assertEqual(result.body.length, blogsAtBegin.length);
    });
  });

  describe('createBlogHandler', () => {
    test('succeeds creating a new blog', async () => {
      const blogsAtBegin = await helper.getBlogs();

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${usersHelper.getToken()}`)
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.getBlogs();
      const titles = getProperty(blogsAtEnd, 'title');
      
      assertEqual(blogsAtEnd.length, blogsAtBegin.length + 1);
      assertIncludes(titles, helper.newBlog.title);
    });

    test('fails creating a new blog when missing one of data and returns 400 status code', async () => {
      const blogsAtBegin = await helper.getBlogs();

      const newBlog = { ...helper.newBlog };
      delete newBlog.url;

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${usersHelper.getToken()}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.getBlogs();
      const titles = getProperty(blogsAtEnd, 'title');

      assertEqual(blogsAtEnd.length, blogsAtBegin.length);
      assertNotIncludes(titles, newBlog.title);
    });

    test('succeeds creating a new blog, when likes field is missing set 0 as default', async () => {
      const blogsAtBegin = await helper.getBlogs();

      const newBlog = { ...helper.newBlog };
      delete newBlog.likes;

      const result = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${usersHelper.getToken()}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.getBlogs();

      assertEqual(blogsAtEnd.length, blogsAtBegin.length + 1);
      assertEqual(result.body.likes, 0);
    });

    test('fails creating a new blog, when authorization invalid', async () => {
      const result = await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(401);
      
      const error = result.body.error;
      assertIncludes(error, 'invalid token');
    });
  });

  describe('deleteBlogHandler', () => {
    test('succeeds deleting Blog if id is correct', async () => {
      const blog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${usersHelper.getToken()}`)
        .send(helper.newBlog);
      const blogId = blog.body.id; 
      
      const blogsAtBegin = await helper.getBlogs();

      await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', `Bearer ${usersHelper.getToken()}`)
        .expect(204);

      const blogsAtEnd = await helper.getBlogs();
      assertEqual(blogsAtEnd.length, blogsAtBegin.length - 1);
    });

    test('fails deleting blog if not belong its user', async () => {
      const blogsAtBegin = await helper.getBlogs();
      const blog = blogsAtBegin[0];

      const result = await api
        .delete(`/api/blogs/${blog._id}`)
        .set('Authorization', `Bearer ${usersHelper.getToken()}`)
        .expect(401);
      
      const blogsAtEnd = await helper.getBlogs();
      assertEqual(blogsAtEnd.length, blogsAtBegin.length);
      assertIncludes(result.body.error, 'authorization');
    });
  });

  describe('updateBlogHandler', () => {
    test('succeeds and returns updated blog', async () => {
      const blogsAtBegin = await helper.getBlogs();
      const blog = blogsAtBegin[0];

      const updateBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.author,
        likes: blog.likes + 1,
      };

      const result = await api
        .put(`/api/blogs/${blog._id}`)
        .send(updateBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      assertEqual(result.body.likes, blog.likes + 1);
    });
  });
});

after(async () => await mongoose.connection.close());