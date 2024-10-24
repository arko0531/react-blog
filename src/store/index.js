import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import searchPostsReducer from './reducers/posts';

const store = configureStore({
  reducer: { auth: authReducer, posts: searchPostsReducer },
});

export default store;
