import reducer from './user'
import deepFreeze from 'deep-freeze'

describe('User Reducer', () => {
  test('succeeds setting user info with SET_USER', () => {
    const state = null
    const action = {
      type: 'SET_USER',
      payload: {
        username: 'himumi',
        name: 'Himumi'
      }
    }

    const newState = reducer(state, action)

    expect(newState).toStrictEqual(action.payload)
  })

  test('succeeds removing user info with REMOVE_USER', () => {
    const state = {
      username: 'himumi',
      name: 'Himumi'
    }
    const action = {
      type: 'REMOVE_USER'
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toBeNull()
  })
})