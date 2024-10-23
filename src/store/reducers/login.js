import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLogin: false };

const loginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const isLoginActions = loginSlice.actions;

export default loginSlice.reducer;
