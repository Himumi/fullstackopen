import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    create(state, action) {
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
    }
  }
})

const { create, update, remove } = blogsSlice.actions
export default blogsSlice.reducer