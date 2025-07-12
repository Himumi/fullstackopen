import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    }
  }
})

const { create } = blogsSlice.actions
export default blogsSlice.reducer