import { createSlice } from '@reduxjs/toolkit';

const initialState = { posts: [], searchValue: '' };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    handleStartPostList(state, action) {
      state.posts = action.payload;
    },
    handlePostsList(state, action) {
      state.posts = [...state.posts, ...action.payload];
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  }
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
