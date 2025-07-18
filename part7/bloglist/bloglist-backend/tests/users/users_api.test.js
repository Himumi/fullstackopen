const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../../app')
const helper = require('./users_helper')

const api = supertest(app)

describe('users api', () => {
  beforeEach(async () => {
    await helper.resetDB()
  })

  describe('POST', () => {
    describe('succeeds creating a new user', () => {
      test('when data are correct', async () => {
        const usersAtBegin = await helper.getUsers()

        const newUser = {
          username: 'himumi',
          name: 'Himumi Erliansyah',
          password: 'sangatrahasia'
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.getUsers()
        assert.strictEqual(usersAtEnd.length, usersAtBegin.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        assert(usernames.includes(newUser.username))
      })
    })

    describe('fails creating a new user', () => {
      test('when username or password are missing', async () => {
        const usersAtBegin = await helper.getUsers()

        const newUser = {
          password: 'himitsu',
          name: 'Himumi'
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.getUsers()

        assert.strictEqual(usersAtEnd.length, usersAtBegin.length)
        assert(result.body.error.includes('is required'))
      })

      test('when username less than 3 chars', async () => {
        const usersAtBegin = await helper.getUsers()

        const newUser = {
          username: 'hm',
          name: 'Himumi',
          password: 'himitsu'
        }

        const result = await api.post('/api/users').send(newUser).expect(400)

        const usersAtEnd = await helper.getUsers()
        assert.strictEqual(usersAtEnd.length, usersAtBegin.length)
        assert(result.body.error.includes('less than 3 chars'))
      })

      test('when user is already taken (unique)', async () => {
        const usersAtBegin = await helper.getUsers()

        const newUser = {
          username: 'root',
          name: 'Lesseruser',
          password: 'lesssecret'
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.getUsers()
        assert.strictEqual(usersAtEnd.length, usersAtBegin.length)
        assert(result.body.error.includes('unique'))
      })
    })
  })

  describe('GET', () => {
    describe('succeeds returning users', () => {
      test('when data are correct', async () => {
        const usersAtBegin = await helper.getUsers()

        const result = await api
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.length, usersAtBegin.length)
      })
    })
  })

  after(async () => {
    await helper.removeAllInfo()
    await mongoose.connection.close()
  })
})
