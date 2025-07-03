const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('titleInput').fill(blog.title)
  await page.getByTestId('authorInput').fill(blog.author)
  await page.getByTestId('urlInput').fill(blog.url)
  await page.getByRole('button', { name: 'create' }).click()
}

module.exports = { loginWith, createBlog }