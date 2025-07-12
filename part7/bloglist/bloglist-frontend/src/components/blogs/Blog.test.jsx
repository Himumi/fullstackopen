import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Note />', () => {
  let container

  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'Blog url',
    likes: 0,
    user: 'user id'
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })

  // helpers
  const selectByQuery = (query, container) =>
    container.querySelector(query)

  const expectToHaveStyle = (style, target) =>
    expect(target).toHaveStyle(style)
  const expectToNotHaveStyle = (style, target) =>
    expect(target).not.toHaveStyle(style)
  const expectToHaveLength = (length, target) =>
    expect(target).toHaveLength(length)

  const userHelper = () => new Object({
    user: userEvent.setup(),
    mocker: vi.fn()
  })

  test('renders content', async () => {
    await screen.findByText('Blog title by Blog author')
  })

  test('does not display url, likes by default', async () => {
    const div = selectByQuery('.hiddenContent', container)
    expectToHaveStyle('display: none', div)
  })

  test('displays hidden content if user clicks the button', async () => {
    const { user } = userHelper()
    const button = selectByQuery('.hiddenButton', container)

    const divBeforeClick = selectByQuery('.hiddenContent', container)
    expectToHaveStyle('display: none', divBeforeClick)

    // mocking user click
    await user.click(button)

    const divAfterClick = selectByQuery('.hiddenContent', container)
    expectToNotHaveStyle('display: none', divAfterClick)
  })

  test('calls update blog function if user clicks like button twice', async () => {
    const { user, mocker } = userHelper()
    const { container } = render(
      <Blog blog={blog} handleUpdateBlog={mocker} />
    )

    const viewButton = selectByQuery('.hiddenButton', container)
    await user.click(viewButton)

    const likeButton = selectByQuery('.likeButton', container)
    await user.click(likeButton)
    await user.click(likeButton)

    expectToHaveLength(2, mocker.mock.calls)
  })

  test('calls remove blog handler if user clicks remove button', async () => {
    const { user, mocker } = userHelper()
    const { container } = render(
      <Blog blog={blog} handleRemoveBlog={mocker} />
    )

    const viewButton = selectByQuery('.viewButton', container)
    await user.click(viewButton)

    const removeButton = selectByQuery('.removeButton', container)
    await user.click(removeButton)

    expectToHaveLength(1, mocker.mock.calls)
  })
})