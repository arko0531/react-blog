import { createSlice } from '@reduxjs/toolkit';

const initialState = { searchPosts: '', searchResult: null, foundSearchResult: true };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    handleSearchPostsResult(state, action) {
      state.searchResult = action.payload;
    },
    handleFoundSearchResult(state, action) {
      state.foundSearchResult = action.payload;
    },
    handleSearchPosts(state, action) {
      state.searchPosts = action.payload;
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
