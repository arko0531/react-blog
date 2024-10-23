import { configureStore } from '@reduxjs/toolkit';
import isLoginReducer from './reducers/login';

const store = configureStore({
  reducer: { isLogin: isLoginReducer },
});

export default store;
