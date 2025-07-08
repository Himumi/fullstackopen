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
})