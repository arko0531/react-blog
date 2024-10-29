import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from 'firebase.js';
import PostCard from 'components/post/card/PostCard';
import Button from 'components/ui/Button';

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('mode');
  const posts = useSelector((state) => state.posts.posts);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('timeStamp', 'desc')
      );

      const querySnapshot = await getDocs(postsQuery);
      const posts = {};
      querySnapshot.forEach((doc) => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });

      return posts;
    }
  });

  useEffect(() => {
    if (data) {
      const posts = Object.values(data);
      dispatch(postsActions.handlePostsList(posts));
    }
  }, [data]);

  // 페이지네이션
  const lastPage = currentPage * postsPerPage;
  const firstPage = lastPage - postsPerPage;
  const currentPosts = posts?.slice(firstPage, lastPage); // 전체 게시물 중에서 현재 페이지 게시물들만 슬라이스

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

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

  if (currentPosts.length > 0) {
    content = (
      <PostListWrapper>
        {currentPosts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </PostListWrapper>
    );
  } else if (currentPosts.length === 0 && !isLoading) {
    content =
      search === 'search' ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <p>현재 게시글이 없습니다.</p>
      );
  }

  return (
    <>
      <Title>POSTS</Title>
      {content}
      <Pagination>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            $width="40"
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Button>
        ))}
      </Pagination>
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
