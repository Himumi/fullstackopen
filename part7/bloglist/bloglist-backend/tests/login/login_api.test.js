const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../../app')
const usersHelper = require('../users/users_helper')

const api = supertest(app)

describe('login api', () => {
  beforeEach(async () => {
    await usersHelper.resetDB()
  })

  describe('succeeds login', () => {
    test('when all data are correct', async () => {
      const login = {
        username: 'root',
        password: 'rahasia'
      }

      const result = await api
        .post('/api/login')
        .send(login)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.username, login.username)
    })
  })

  describe('fails login', () => {
    test('when one of data missing (bad request)', async () => {
      const login = { username: 'root' }

      const result = await api
        .post('/api/login')
        .send(login)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('missing username or password'))
    })
  })

  after(async () => {
    await usersHelper.removeAllInfo()
    await mongoose.connection.close()
  })
})
