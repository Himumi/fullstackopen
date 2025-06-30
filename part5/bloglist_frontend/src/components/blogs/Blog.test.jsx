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
})