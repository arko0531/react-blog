import { createSlice } from '@reduxjs/toolkit';

const initialState = { posts: [] };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    handleSearchPostsResult(state, action) {
      state.posts = [...state.posts, ...action.payload];
    }
  }
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
