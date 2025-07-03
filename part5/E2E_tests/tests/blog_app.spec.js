const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Erliansyah',
        username: 'himumi',
        password: 'rahasia',
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText(
      'log in to application'
    )).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'himumi', 'rahasia')
      await expect(page.getByText(
        'Erliansyah logged in'
      )).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'himumi', 'wrong')
      await expect(page.getByText(
        'Wrong username or password'
      )).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'himumi', 'rahasia')
    })

    test('succeeds creating a new blog', async ({ page }) => {
      await createBlog(page, {
        title: 'title',
        author: 'author',
        url: 'url'
      })
      await expect(page.locator('.blog>span')).toBeVisible()
    })
  })
})