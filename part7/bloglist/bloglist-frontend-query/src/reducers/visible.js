const visibleReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_VISIBLE':
      return true
    default:
      return state
  }
}

export default visibleReducer