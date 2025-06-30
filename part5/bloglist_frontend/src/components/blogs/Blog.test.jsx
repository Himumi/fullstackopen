import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'
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

  const expectToHaveStyle = (target, style) =>
    expect(target).toHaveStyle(style)
  const expectToNotHaveStyle = (target, style) =>
    expect(target).not.toHaveStyle(style)

  test('renders content', async () => {
    await screen.findByText('Blog title by Blog author')
  })

  test('does not display url, likes by default', async () => {
    const div = selectByQuery('.hiddenContent', container)
    expect(div).toHaveStyle('display: none')
  })

  test('displays hidden content if user clicks the button', async () => {
    const user = userEvent.setup()
    const button = selectByQuery('.hiddenButton', container)

    const divBeforeClick = selectByQuery('.hiddenContent', container)
    expectToHaveStyle(divBeforeClick, 'display: none')

    // mocking user click
    await user.click(button)

    const divAfterClick = selectByQuery('.hiddenContent', container)
    expectToNotHaveStyle(divAfterClick, 'display: none')
  })

  test('calls update blog function if user clicks like button twice', async () => {
    const likeMock = vi.fn()
    const { container } = render(<Blog blog={blog} handleUpdateBlog={likeMock} />)
    const user = userEvent.setup()

    const viewButton = selectByQuery('.hiddenButton', container)
    await user.click(viewButton)

    const likeButton = selectByQuery('.likeButton', container)
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeMock.mock.calls).toHaveLength(2)
  })
})