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
    await expect(page.getByText('log in to application')).toBeVisible()
  })
})