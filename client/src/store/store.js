import { configureStore } from "@reduxjs/toolkit";
import { postSlice, stateSlice, userSlice } from "./slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    post: postSlice.reducer,
    state: stateSlice.reducer,
  },
});

export default store;
