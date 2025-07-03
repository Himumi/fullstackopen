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

const getButtonAndClick = async (page, prop) =>
  await page.getByRole('button', { name: prop }).click()

const acceptWindowConfirm = (page) =>
  page.on('dialog', async dialog => await dialog.accept())

const createUser = async (request, info) =>
  await request.post('/api/users', { data: info })

const resetDB = async (request) =>
  await request.post('/api/testing/reset')

module.exports = { 
  loginWith,
  createBlog,
  getButtonAndClick,
  acceptWindowConfirm,
  createUser,
  resetDB,
}