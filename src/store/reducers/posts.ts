import { createSlice } from '@reduxjs/toolkit';
import { PostsReducerInfo } from 'types/post-interface';

const initialState: PostsReducerInfo = { posts: [], searchValue: '' };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    handlePostsList(state, action) {
      state.posts = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  }
});

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
