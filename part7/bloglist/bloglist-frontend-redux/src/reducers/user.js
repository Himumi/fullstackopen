import { createSlice } from "@reduxjs/toolkit";
import loginServices from '../services/login'
import blogServices from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    remove(state, action) {
      return null
    }
  }
})

export const { set, remove } = userSlice.actions

export const setUserAndSave = (credential) => {
  return async dispatch => {
    const user = await loginServices.login(credential)
    // add user information to app
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogServices.setToken(user.token)
    dispatch(set(user))
  }
}

export default userSlice.reducer