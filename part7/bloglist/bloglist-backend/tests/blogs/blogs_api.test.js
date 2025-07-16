const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../../app')
const helper = require('./blogs_helper')
const usersHelper = require('../users/users_helper')
const api = supertest(app)

const assertEqual = (latestLength, prevLength) =>
  assert.strictEqual(latestLength, prevLength)
const assertIncludes = (text, target) => assert(text.includes(target))
const assertNotIncludes = (text, target) => assert(!text.includes(target))
const getProperty = (objects, property) => objects.map((o) => o[property])

describe('blogs api', () => {
  beforeEach(async () => {
    await helper.resetDB()

    const login = await api
      .post('/api/login')
      .send(usersHelper.rootLogin)
      .expect(200)

    usersHelper.setToken(login.body.token)
  })

  describe('GET', () => {
    describe('succeeds returning', () => {
      test('a blog', async () => {
        const blogs = await helper.getBlogs()
        const blog = blogs.find(blog => blog.title === 'Type wars')

        const result = await api
          .get(`/api/blogs/${blog._id.toString()}`)
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.getBlogs()
        const titles = blogsAtEnd.map(blog => blog.title)

        assert(titles.includes(result.body.title))
      })

      test('all blogs', async () => {
        const blogs = await helper.getBlogs()
        const result = await api
          .get('/api/blogs')
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        assertEqual(result.body.length, blogs.length)
      })

      test('blogs with id property instead _id', async () => {
        const result = await api
          .get('/api/blogs')
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const blog = result.body[0]

        assert(blog.hasOwnProperty('id'))
        assert(!blog.hasOwnProperty('_id'))
      })

      test('blogs eventhough without token', async () => {
        const blogsAtBegin = await helper.getBlogs()

        const result = await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)

        assertEqual(result.body.length, blogsAtBegin.length)
      })
    })
  })

  describe('POST', () => {
    describe('succeeds creating a new blog', () => {
      test('when data are correct', async () => {
        const blogsAtBegin = await helper.getBlogs()

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .send(helper.newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.getBlogs()
        const titles = getProperty(blogsAtEnd, 'title')

        assertEqual(blogsAtEnd.length, blogsAtBegin.length + 1)
        assertIncludes(titles, helper.newBlog.title)
      })

      test('when likes field is missing set 0 as default', async () => {
        const blogsAtBegin = await helper.getBlogs()

        const newBlog = { ...helper.newBlog }
        delete newBlog.likes

        const result = await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.getBlogs()

        assertEqual(blogsAtEnd.length, blogsAtBegin.length + 1)
        assertEqual(result.body.likes, 0)
      })
    })

    describe('fails creating a new blog', () => {
      test('when missing one of data and returns 400 status code', async () => {
        const blogsAtBegin = await helper.getBlogs()

        const newBlog = { ...helper.newBlog }
        delete newBlog.url

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .send(newBlog)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.getBlogs()
        const titles = getProperty(blogsAtEnd, 'title')

        assertEqual(blogsAtEnd.length, blogsAtBegin.length)
        assertNotIncludes(titles, newBlog.title)
      })

      test('when authorization invalid', async () => {
        const result = await api
          .post('/api/blogs')
          .send(helper.newBlog)
          .expect(401)

        const error = result.body.error
        assertIncludes(error, 'invalid token')
      })
    })
  })

  describe('DELETE', () => {
    describe('succeeds deleting blog', () => {
      test('when id is correct', async () => {
        const blog = await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .send(helper.newBlog)
        const blogId = blog.body.id

        const blogsAtBegin = await helper.getBlogs()

        await api
          .delete(`/api/blogs/${blogId}`)
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .expect(204)

        const blogsAtEnd = await helper.getBlogs()
        assertEqual(blogsAtEnd.length, blogsAtBegin.length - 1)
      })

    })

    describe('fails deleting blog', () => {
      test('when not belong its user', async () => {
        const blogsAtBegin = await helper.getBlogs()
        const blog = blogsAtBegin[0]

        const result = await api
          .delete(`/api/blogs/${blog._id}`)
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .expect(401)

        const blogsAtEnd = await helper.getBlogs()
        assertEqual(blogsAtEnd.length, blogsAtBegin.length)
        assertIncludes(result.body.error, 'authorization')
      })
    })
  })

  describe('PUT', () => {
    describe('succeeds updating', () => {
      test('when data are correct', async () => {
        let blog = await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .send(helper.newBlog)

        blog = blog.body
        const blogId = blog.id

        const updateBlog = {
          title: blog.title,
          author: blog.author,
          url: blog.author,
          likes: blog.likes + 1
        }

        const result = await api
          .put(`/api/blogs/${blogId}`)
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .send(updateBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        assertEqual(result.body.likes, blog.likes + 1)
      })

      test('when access /likes, any users can update any blog likes', async () => {
        const blogs = await helper.getBlogs()
        const blog = blogs[2]
        const updatedLikes = await api
          .put(`/api/blogs/${blog._id.toString()}/likes`)
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        
        assertEqual(updatedLikes.body.likes, blog.likes + 1)
      })
    })

    describe('fails updating', () => {
      test('when not belong its user', async () => {
        const blogsAtBegin = await helper.getBlogs()
        const blog = blogsAtBegin[0]
        const updateBlog = {
          title: blog.title,
          author: blog.author,
          url: blog.author,
          likes: blog.likes + 1
        }

        result = await api
          .put(`/api/blogs/${blog._id}`)
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .send(updateBlog)
          .expect(401)
        
        const blogsAtEnd = await helper.getBlogs()
        const targetBlog = blogsAtEnd.find(b => 
          b._id.toString() === blog._id.toString())

        assertEqual(targetBlog.likes, blog.likes)
      })
    })
  })

  after(async () => {
    await helper.removeAllInfo()
    await mongoose.connection.close()
  })
})
