import { createSlice } from "@reduxjs/toolkit";

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
export default blogsSlice.reducer