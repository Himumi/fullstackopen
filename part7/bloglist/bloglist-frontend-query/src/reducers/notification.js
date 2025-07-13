const initialState = {
  status: '',
  message: '',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.payload 
    default:
      return state
  }
}

export default notificationReducer