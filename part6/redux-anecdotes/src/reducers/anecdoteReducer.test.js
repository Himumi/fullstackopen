import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'
import { toggleVote, newAnecdote } from './anecdoteReducer'

describe('anecdote reducer', () => {
  test('returns new state with action toggleVote', () => {
    const state = [
      {
        content: 'the anecdote testing example',
        id: 1,
        votes: 0
      }
    ]
    const action = {
      type: 'anecdotes/toggleVote',
      payload: 1
    }

    deepFreeze(state)

    const newState = anecdoteReducer(state, action)
    const anecdote = newState.find(a => a.id === action.payload)

    expect(anecdote.votes).toBe(1)
  })

  test('succeeds to return new state with action newAnecdote', () => {
    const state = []
    const action = {
      type: 'anecdotes/newAnecdote',
      payload: 'the anecdote testing content'
    }

    deepFreeze(state)

    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState[0].content).toBe(action.payload)
  })
})