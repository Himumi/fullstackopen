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
})