import { createSlice } from '@reduxjs/toolkit';

const initialState = { posts: [] };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    handleSearchPostsResult(state, action) {
      if (action.payload.reset) {
        state.posts = action.payload.posts;
      } else {
        state.posts = [...state.posts, ...action.payload.posts];
      }
    }
  }
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
