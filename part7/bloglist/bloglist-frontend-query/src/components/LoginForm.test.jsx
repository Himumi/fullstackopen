import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'
import userEvent from '@testing-library/user-event'
import { describe, expect } from 'vitest'
import { ReducerProvider } from '../reducers/ReducerContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

describe('<LoginForm />', () => {
  const selectByQuery = (query, container) => container.querySelector(query)

  const expectToBe = (value, target) => expect(target).toBe(value)
  const expectToHaveLength = (length, target) =>
    expect(target).toHaveLength(length)

  test('renders login form', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ReducerProvider>
          <LoginForm />
        </ReducerProvider>
      </QueryClientProvider>
    )
    await screen.findByText('log in to application')
  })

  test('calls handleLogin if user creates new blog', async () => {
    const user = userEvent.setup()
    const mocker = vi.fn()
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <ReducerProvider>
          <LoginForm handleLogin={mocker} />
        </ReducerProvider>
      </QueryClientProvider>
    )

    const usernameInput = selectByQuery('.username', container)
    const passwordInput = selectByQuery('.password', container)
    const loginButton = selectByQuery('.loginButton', container)

    await user.type(usernameInput, 'himumi')
    await user.type(passwordInput, 'rahasia')
    await user.click(loginButton)

    const { calls } = mocker.mock
    expectToHaveLength(1, calls)
  })
})
