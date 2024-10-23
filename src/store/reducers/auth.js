import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLogin: false };

const authSlice = createSlice({
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

export const authActions = authSlice.actions;

export default authSlice.reducer;
