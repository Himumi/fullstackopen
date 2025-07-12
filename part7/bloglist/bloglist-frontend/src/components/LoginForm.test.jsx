import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'
import userEvent from '@testing-library/user-event'
import { describe, expect } from 'vitest'

describe('<LoginForm />', () => {
  const selectByQuery = (query, container) => container.querySelector(query)

  const expectToBe = (value, target) => expect(target).toBe(value)
  const expectToHaveLength = (length, target) =>
    expect(target).toHaveLength(length)

  test('renders login form', async () => {
    render(<LoginForm />)
    await screen.findByText('log in to application')
  })

  test('calls handleLogin if user creates new blog', async () => {
    const user = userEvent.setup()
    const mocker = vi.fn()
    const { container } = render(<LoginForm handleLogin={mocker} />)

    const usernameInput = selectByQuery('.username', container)
    const passwordInput = selectByQuery('.password', container)
    const loginButton = selectByQuery('.loginButton', container)

    await user.type(usernameInput, 'himumi')
    await user.type(passwordInput, 'rahasia')
    await user.click(loginButton)

    const { calls } = mocker.mock
    expectToHaveLength(1, calls)
    expectToBe('himumi', calls[0][0].username)
    expectToBe('rahasia', calls[0][0].password)
  })
})
