import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage(state, action) {
      return ''
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (message, second) => async dispatch => {
  dispatch(setMessage(message))
  setTimeout(() => dispatch(removeMessage()), second*1000)
}

export default notificationSlice.reducer