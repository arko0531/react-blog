import React from 'react';
import PostCard from './card/PostCard';
import styled from 'styled-components';

const PostList = () => {
  return (
    <PostListWrapper>
      <PostCard />
    </PostListWrapper>
  );
};

export default PostList;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  flex-grow: 1;
  justify-content: start;
  flex-flow: row wrap;
`;
