import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/reducers/auth';
import searchPostsReducer from 'store/reducers/posts';

const store = configureStore({
  reducer: { auth: authReducer, posts: searchPostsReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
