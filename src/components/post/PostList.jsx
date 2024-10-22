import React from 'react';
import PostCard from './card/PostCard';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PostList = () => {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => axios.get('https://react-blog-cf942-default-rtdb.firebaseio.com/posts'),
  });

  // await 사용하기

  console.log(data);

  let content;

  if (!data) {
    content = <p>현재 포스트가 없습니다.</p>;
  }

  if (data) {
    content = (
      <PostListWrapper>
        {data.map(post => (
          <PostCard post={post} />
        ))}
      </PostListWrapper>
    );
  }

  return (
    <>
      <Title>POST</Title>
      {content}
    </>
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

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;
