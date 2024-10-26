import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  access: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = true;
      state.access = action.payload;
    },
    logout: (state) => {
      state.auth = false;
      state.access = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
