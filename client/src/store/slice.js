import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userSlice",
  initialState: { name: "kim", account: "", nickname: "", balance: "" },
  reducers: {
    info: (state, action) => {
      console.log(action);
      state.name = action.payload.name;
      state.account = action.payload.account;
      state.nickname = action.payload.nickname;
      state.balance = action.payload.balance;
    },
  },
});

export const postSlice = createSlice({
  name: "postSlice",
  initialState: { list: [] },
  reducers: {
    postlist: (state, action) => {
      state.list = action.payload.list;
    },
  },
});

export const stateSlice = createSlice({
  name: "stateSlice",
  initialState: { control: null },
  reducers: {
    check: (state, action) => {
      if (action.payload.type === "error") {
        state.control = "error";
      } else if (action.payload.type === "loading") {
        state.control = "loading";
      } else if (action.payload.type === "login") {
        state.control = "login";
      }
    },
  },
});

export const { info } = userSlice.actions;
export const { postlist } = postSlice.actions;
export const { check } = stateSlice.actions;
