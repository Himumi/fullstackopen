const { test, expect, beforeEach, describe } = require('@playwright/test')
const { 
  loginWith,
  createBlog,
  getButtonAndClick,
  acceptWindowConfirm,
  createUser,
  resetDB,
} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await resetDB(request)
    await createUser(request, {
      name: 'Erliansyah',
      username: 'himumi',
      password: 'rahasia',
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
        await getButtonAndClick(page, 'view')
        await getButtonAndClick(page, 'like')

        await expect(page.locator(
          '.hiddenContent>span:nth-child(2)'
        )).toHaveText('likes 1')
      })

      test('succeeds removing blog', async ({ page }) => {
        // have to define events on top
        acceptWindowConfirm(page)

        await getButtonAndClick(page, 'view')
        await getButtonAndClick(page, 'remove')

        await expect(page.locator('.blog')).not.toBeVisible()
      })

      test('fails removing blog belong other user', async ({ page, request }) => {
        // logout 
        await getButtonAndClick(page, 'logout')
        // creating a new user
        await createUser(request, {
          name: 'other user',
          username: 'otheruser',
          password: 'secret',
        })

        // login with other user
        await loginWith(page, 'otheruser', 'secret')

        acceptWindowConfirm(page)

        // try to remove other user blog
        await getButtonAndClick(page, 'view')
        await getButtonAndClick(page, 'remove')

        await expect(page.locator('.notification')).toBeVisible()
      })

      test('succeeds arranged blog according to blogs likes', async ({ page }) => {
        await createBlog(page, {
          title: 'title2', author: 'author2', url: 'url2'
        })
        await page.locator('.blog:nth-child(2) .hiddenButton').click()
        await getButtonAndClick(page, 'like')
        await expect(page.locator('.blog:first-child>span')).toHaveText('title2')
      })
    })
  })
})