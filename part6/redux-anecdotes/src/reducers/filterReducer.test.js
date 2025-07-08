import deepFreeze from 'deep-freeze'
import filterReducer from './filterReducer'

describe('filter reducer', () => {
  test('returns a new state with filterAnecdote', () => {
    const state = ''
    const action = {
      type: 'filter/filterAnecdote',
      payload: 'anecdote'
    }

    deepFreeze(state)

    const newState = filterReducer(state, action)

    expect(newState).toBe('anecdote')
  })
})