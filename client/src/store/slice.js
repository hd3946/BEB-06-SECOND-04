import { createSlice, current } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: { email: "", account: "", nickname: "", balance: "", img: "" },
  reducers: {
    info: (state, action) => {
      state.email = action.payload.email;
      state.account = action.payload.account;
      state.nickname = action.payload.nickname;
      state.balance = action.payload.balance;
      state.img = action.payload.img;
    },
    logout: (state, action) => {
      state.email = "";
      state.account = "";
      state.nickname = "";
      state.balance = "";
      state.img = "";
    },
  },
});

export const postSlice = createSlice({
  name: "postSlice",
  initialState: { list: [], filterList: [], detailPage: [], commentList: [] },
  reducers: {
    postlist: (state, action) => {
      state.list = action.payload.list;
    },
    filtering: (state, action) => {
      state.filterList = action.payload.list;
    },
    detailPageCall: (state, action) => {
      state.detailPage = current(state.list).filter((data, index) => {
        return String(data.postId) === action.payload.postId;
      });
    },
    comment: (state, action) => {
      state.conmentList = action.payload.comment;
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
      } else if (action.payload.type === "logout") {
        state.control = "logout";
      } else if (action.payload.type === "success") {
        state.control = "success";
      } else {
        state.control = null;
      }
    },
  },
});

export const { info, logout } = userSlice.actions;
export const { postlist, filtering, detailPageCall } = postSlice.actions;
export const { check } = stateSlice.actions;
