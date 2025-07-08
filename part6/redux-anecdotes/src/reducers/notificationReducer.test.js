import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notification reducer', () => {
  test('returns new state with setMessage', () => {
    const state = ''
    const action = {
      type: 'notification/setMessage',
      payload: 'notification'
    }

    deepFreeze(state)

    const newState = notificationReducer(state, action)

    expect(newState).toBe('notification')
  })

  test('removes state with removeMessage', () => {
    const state = 'notification'
    const action = {
      type: 'notification/removeMessage'
    }

    deepFreeze(state)

    const newState = notificationReducer(state, action)

    expect(newState).toBe('')
  })
})