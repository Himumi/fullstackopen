const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export default userReducer