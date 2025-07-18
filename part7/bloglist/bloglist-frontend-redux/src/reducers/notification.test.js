import deepFreeze from 'deep-freeze'
import reducer from './notification'

describe('Notification Reducer', () => {
  test('returns notification message with action notification/setMessage', () => {
    const state = {
      message: '',
      status: ''
    }
    const action = {
      type: 'notification/setMessage',
      payload: {
        message: 'notification message',
        status: 'success',
      } 
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toStrictEqual(action.payload)
  })

  test('returns empty string with action notification/removeMessage', () => {
    const state = {
      message: 'notification',
      status: 'success'
    }
    const action = {
      type: 'notification/removeMessage'
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toStrictEqual({
      message: '',
      status: ''
    })
  })
})
