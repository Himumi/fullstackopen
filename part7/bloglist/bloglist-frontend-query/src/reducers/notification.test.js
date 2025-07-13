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
})