import reducer from './visible'
import deepFreeze from 'deep-freeze'

describe('Visible Reducer', () => {
  test('returns new state with SET_VISIBLE', () => {
    const state = false
    const action = {
      type: 'SET_VISIBLE'
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toBeTruthy()
  })

  test('returns new state with SET_NOT_VISIBLE', () => {
    const state = true
    const action = {
      type: 'SET_NOT_VISIBLE'
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toBeFalsy()
  })

  test('changes state with TOGGLE_VISIBLE', () => {
    const state = false
    const action = {
      type: 'TOGGLE_VISIBLE'
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toBeTruthy()
  })
})