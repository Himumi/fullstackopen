const visibleReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_VISIBLE':
      return true
    case 'SET_NOT_VISIBLE':
      return false
    default:
      return state
  }
}

export default visibleReducer