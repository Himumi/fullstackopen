const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/testing/reset')
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

  test('succeeds logged in', async ({ page }) => {
    await page.getByTestId('username').fill('himumi')
    await page.getByTestId('password').fill('rahasia')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText(
      'Erliansyah logged in'
    )).toBeVisible()
  })

  test('fails logged in', async ({ page }) => {
    await page.getByTestId('username').fill('himumi')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText(
      'Wrong username or password'
    )).toBeVisible()
  })
})