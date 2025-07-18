import deepFreeze from 'deep-freeze'
import reducer from './user'

describe('User Reducer', () => {
  test('succeeds setting user with user/set', () => {
    const state = null
    const action = {
      type: 'user/set',
      payload: {
        username: 'himumi',
        hame: 'Himumi'
      }
    }

    const newState = reducer(state, action)

    expect(newState).toStrictEqual(action.payload)
  })

  test('succeeds removing user with user/remove', () => {
    const state = {
      username: 'himumi',
      name: 'Himumi'
    }
    const action = {
      type: 'user/remove'
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toBeNull()
  })
})