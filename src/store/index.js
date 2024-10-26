import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/reducers/auth';
import searchPostsReducer from 'store/reducers/posts';

const store = configureStore({
  reducer: { auth: authReducer, posts: searchPostsReducer }
});

export default store;
