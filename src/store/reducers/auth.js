import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLogin: false, token: null };

const authSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    login(state, actions) {
      state.isLogin = true;
      localStorage.setItem('token', actions.payload);
    },
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem('token');
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
