import React from 'react';
import PostCard from './card/PostCard';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';

const PostList = () => {
  const searchResult = useSelector(state => state.posts.searchResult);
  const foundSearchResult = useSelector(state => state.posts.foundSearchResult);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const posts = {};
      querySnapshot.forEach(doc => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });
      return posts;
    },
    enabled: searchResult === null || searchResult.length === 0,
  });

  let content;

  if (isLoading) {
    content = <p>로딩 중...</p>;
  }

  if (error) {
    content = (
      <>
        <p>오류가 발생했습니다.</p>
        <p> {error.message}</p>
      </>
    );
  }

  if (data) {
    const posts = Object.values(data);

    content = (
      <PostListWrapper>
        {posts.map(post => (
          <PostCard key={post.postId} post={post} />
        ))}
      </PostListWrapper>
    );
  }

  if (searchResult) {
    content = (
      <PostListWrapper>
        {searchResult.map(post => (
          <PostCard key={post.postId} post={post} />
        ))}
      </PostListWrapper>
    );
  }

  if (!foundSearchResult) {
    content = <p>검색 결과가 없습니다.</p>;
  }

  return (
    <>
      <Title>POSTS</Title>
      {content}
    </>
  );
};

export default PostList;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 70px;
  flex-grow: 1;
  justify-content: start;
  flex-flow: row wrap;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;
