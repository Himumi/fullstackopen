import { createSlice } from "@reduxjs/toolkit";
import blogServices from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    append(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      return state.map(b => 
        b.id !== action.payload.id ? b : action.payload
      )
    },
    remove(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  }
})

const { append, update, remove, setBlogs } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogServices.create(blog)
    dispatch(append(createdBlog))
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogServices.update(blog)
    dispatch(update(updatedBlog))
  }
}

export default blogsSlice.reducer