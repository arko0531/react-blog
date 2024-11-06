import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthReducerInfo } from 'types/auth-interface';

const initialState: AuthReducerInfo = { isLogin: false };

const authSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    login(state, actions: PayloadAction<string>) {
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
