import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from './reducers/notification'
import blogsReducer from './reducers/blogs'

const reducers = {
  notification: notificationReducer,
  blogs: blogsReducer
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