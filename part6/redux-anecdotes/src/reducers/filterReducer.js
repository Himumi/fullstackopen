const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_ANECDOTE':
      return action.payload
    default:
      return state
  }
}

export const filterAnecdote = (target) => new Object({
  type: 'FILTER_ANECDOTE',
  payload: target
})

export default reducer