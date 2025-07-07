import deepFreeze from 'deep-freeze'
import filterReducer from './filterReducer'

describe('filter reducer', () => {
  test('returns a new state with FILTER_ANECDOTE', () => {
    const state = ''
    const action = {
      type: 'FILTER_ANECDOTE',
      payload: 'anecdote'
    }

    deepFreeze(state)

    const newState = filterReducer(state, action)

    expect(newState).toBe('anecdote')
  })
})