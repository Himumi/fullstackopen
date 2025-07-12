import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  status: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage(state, action) {
      return initialState
    }
  }
})

const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (status, message, second) => {
  return dispatch => {
    dispatch(setMessage({
      message,
      status,
    }))
    setTimeout(() => dispatch(removeMessage({
      message: '',
      status: ''
    })), second * 1000)
  }
}

export default notificationSlice.reducer