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

    describe('created blogs', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: 'title',
          author: 'author',
          url: 'url'
        })
      })

      test('succeeds updating blogs likes', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await page.pause()
        await expect(page.locator(
          '.hiddenContent>span:nth-child(2)'
        )).toHaveText('likes 1')
      })

      test('succeeds removing blog', async ({ page }) => {
        // have to define events on top
        page.on('dialog', async dialog => {
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.locator('.blog')).not.toBeVisible()
      })

      test('fails removing blog belong other user', async ({ page, request }) => {
        // logout 
        await page.getByRole('button', { name: 'logout' }).click()
        // creating a new user
        await request.post('/api/users', {
          data: {
            name: 'other user',
            username: 'otheruser',
            password: 'secret',
          }
        })

        // login with other user
        await loginWith(page, 'otheruser', 'secret')

        page.on('dialog', async dialog => await dialog.accept())

        // try to remove other user blog
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.locator('.notification')).toBeVisible()
      })
    })
  })
})