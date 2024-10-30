import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
import Pagination from 'react-js-pagination';
import { collection, getDocs, orderBy } from 'firebase/firestore';
import { db } from 'firebase.js';
import PostCard from 'components/post/card/PostCard';

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
      const querySnapshot = await getDocs(
        collection(db, 'posts'),
        orderBy('timeStamp', 'desc')
      );
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
  const currentPosts = posts?.slice(firstPage, lastPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      {posts && (
        <PaginationWrapper>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={posts.length}
            pageRangeDisplayed={5}
            prevPageText={'<'}
            nextPageText={'>'}
            onChange={handlePageChange}
            itemClass="pagination-item"
            linkClass="pagination-link"
            activeClass="active"
          />
        </PaginationWrapper>
      )}
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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 22px;

  .pagination-item {
    display: inline-block;
    margin: 0px 10px;

    background-color: #ffdd1ef9;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    line-height: 40px;
    border: none;
    text-align: center;
    font-size: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
      background-color: #f9bb03;
    }
  }

  .pagination-link {
    display: inline-block;
  }

  .active {
    background-color: #f9bb03;
  }
`;
