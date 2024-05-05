import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const saveSlice = createSlice({
  name: "saveItem",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

export const { add, remove } = saveSlice.actions;
export default saveSlice.reducer;
