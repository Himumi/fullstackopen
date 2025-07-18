import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from './reducers/notification'
import blogsReducer from './reducers/blogs'
import userReducer from './reducers/user'

const reducers = {
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
}

const store = configureStore({
  reducer: reducers,
})

export const setupStore = (preloadState) => {
  return configureStore({
    reducer: reducers,
    preloadState
  })
}

export default store