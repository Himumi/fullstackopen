import deepFreeze from 'deep-freeze'
import reducer from './blogs'

describe('Blogs reducer', () => {
  test('returns a new blog with blogs/create', () => {
    const state = []
    const action = {
      type: 'blogs/create',
      payload: {
        title: 'title',
        author: 'author',
        url: 'url',
        id: 1,
        likes: 0,
      }
    }

    deepFreeze(state)
    
    const newState = reducer(state, action)

    expect(newState[0]).toStrictEqual(action.payload)
  })

  test('returns updated blogs with blogs/update', () => {
    const state = [
      {
        title: 'title',
        author: 'author',
        url: 'url',
        id: 1,
        likes: 0,
      }
    ]
    const action = {
      type: 'blogs/update',
      payload: {
        ...state[0],
        likes: state[0].likes + 1
      }
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState[0]).toStrictEqual(action.payload)
  })

  test('succeeds removing blog with blogs/remove', () => {
    const state = [
      {
        title: 'title',
        author: 'author',
        url: 'url',
        id: 1,
        likes: 0,
      }
    ]
    const action = {
      type: 'blogs/remove',
      payload: 1
    }

    deepFreeze(state)

    const newState = reducer(state, action)

    expect(newState).toHaveLength(0)
  })
})