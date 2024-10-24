import { createSlice } from '@reduxjs/toolkit';

const initialState = { searchResult: null, foundSearchResult: true };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    handleSearchPostsResult(state, action) {
      state.searchResult = action.payload;
    },
    hadleFoundSerchResult(state, action) {
      state.foundSearchResult = action.payload;
    },
  },
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
