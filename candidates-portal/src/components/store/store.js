import { configureStore } from "@reduxjs/toolkit";
import saveSlice from "./saveSlice";

const store = configureStore({
  reducer: {
    save: saveSlice,
  },
});

export default store;
