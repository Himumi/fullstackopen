import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

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

  test('succeeds to return new state with action appendAnecdote', () => {
    const state = []
    const action = {
      type: 'anecdotes/appendAnecdote',
      payload: {
        content: 'the anecdote testing content',
        votes: 0,
        id: 1
      } 
    }

    deepFreeze(state)

    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState[0].content).toBe(action.payload.content)
  })

  test('succeeds to set Anecdotes to redux store with setAnecdotes', () => {
    const state = []
    const action = {
      type: 'anecdotes/setAnecdotes',
      payload: [
        {
          content: "If it hurts, do it more often",
          id: "47145",
          votes: 0
        }
      ]
    }

    deepFreeze(state)

    const newState = anecdoteReducer(state, action)
    const contents = newState.map(a => a.content)

    expect(newState).toHaveLength(1)
    expect(contents).toContainEqual(action.payload[0].content)
  })
})