const { test, after, beforeEach, describe, } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../../app')

const helper = require('./comments_helper')
const usersHelper = require('../users/users_helper')
const blogsHelper = require('../blogs/blogs_helper')

const api = supertest(app)

describe('comments api', () => {
  beforeEach(async () => {
    await helper.resetDB()

    const login = await api
      .post('/api/login')
      .send(usersHelper.rootLogin)
      .expect(200)

    usersHelper.setToken(login.body.token)
  })

  describe('POST', () => {
    describe('succeeds creating a new comment', () => {
      test('when data are correct', async () => {
        const blogs = await blogsHelper.getBlogs()
        const blog = blogs.find(blog => blog.title === 'Type wars')

        await api
          .post(`/api/blogs/${blog._id.toString()}/comments`)
          .set('Authorization', `Bearer ${usersHelper.getToken()}`)
          .send(helper.newComment)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const comments = await helper.getComments()
        const contents = comments.map(comment => comment.content)

        assert(contents.includes(helper.newComment.content))
      })
    })

    describe('fails creating a new comment', () => {
      test('when user does not log in', async () => {
        const blogs = await blogsHelper.getBlogs()
        const blog = blogs.find(blog => blog.title === 'Type wars')

        await api
          .post(`/api/blogs/${blog._id.toString()}/comments`)
          .send(helper.newComment)
          .expect(401)
          .expect('Content-Type', /application\/json/)
      })
    })
  })

  after(async () => {
    await helper.removeAllInfo()
    await mongoose.connection.close()
  })
})
