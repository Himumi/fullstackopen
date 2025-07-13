import deepFreeze from 'deep-freeze'
import reducer from './notification'

describe('Notification Reducer', () => {
  test('returns state with SET_MESSAGE action', () => {
    const state = {
      status: '',
      message: '',
    }
    const action = {
      type: 'SET_MESSAGE',
      payload: {
        status: 'success',
        message: 'notification'
      }
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toStrictEqual(action.payload)
  })

  test('succeeds removing notification with REMOVE_MESSAGE', () => {
    const state = {
      status: 'success',
      message: 'notification'
    }
    const action = {
      type: 'REMOVE_MESSAGE'
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toStrictEqual({
      status: '',
      message: '',
    })
  })
})