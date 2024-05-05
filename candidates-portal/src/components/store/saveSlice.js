import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const saveSlice = createSlice({
  name: "saveItem",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
  },
});

export const { add } = saveSlice.actions;
export default saveSlice.reducer;
