const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('himumi')
      await page.getByTestId('password').fill('rahasia')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText(
        'Erliansyah logged in'
      )).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('himumi')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText(
        'Wrong username or password'
      )).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('himumi')
      await page.getByTestId('password').fill('rahasia')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('succeeds creating a new blog', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('titleInput').fill('title')
      await page.getByTestId('authorInput').fill('author')
      await page.getByTestId('urlInput').fill('url')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.locator('.blog>span')).toBeVisible()
    })
  })
})