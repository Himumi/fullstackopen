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
    }
  }
})

const { create, update } = blogsSlice.actions
export default blogsSlice.reducer