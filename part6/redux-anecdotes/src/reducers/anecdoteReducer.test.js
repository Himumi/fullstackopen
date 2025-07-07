import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('anecdote reducer', () => {
  test('returns new state with action TOGGLE_VOTE', () => {
    const state = [
      {
        content: 'the anecdote testing example',
        id: 1,
        votes: 0
      }
    ]
    const action = {
      type: 'TOGGLE_VOTE',
      payload: {
        id: 1
      }
    }

    deepFreeze(state)

    const newState = anecdoteReducer(state, action)

    const replaceAnecdote = a => a.id !== action.payload.id 
      ? a : { ...a, votes: a.votes + 1}
    const expected = state.map(replaceAnecdote)

    expect(newState).toStrictEqual(expected)
  })

  test('succeeds to return new state with action NEW_ANECDOTE', () => {
    const state = []
    const action = {
      type: 'NEW_ANECDOTE',
      payload: {
        content: 'the anecdote testing content'
      }
    }

    deepFreeze(state)

    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState[0].content).toBe(action.payload.content)
  })
})