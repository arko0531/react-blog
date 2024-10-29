import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { db } from 'firebase.js';
import PostCard from 'components/post/card/PostCard';

const PostList = () => {
  const { ref: postRef, inView } = useInView({
    threshold: 1
  });
  const { postKey, setPostKey } = useOutletContext();
  const postsCount = 6;

  const posts = useSelector((state) => state.posts.posts);
  const searchValue = useSelector((state) => state.posts.searchValue);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('mode');

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('timeStamp', 'desc'),
        limit(postsCount)
      );

      const querySnapshot = await getDocs(postsQuery);
      const posts = {};
      querySnapshot.forEach((doc) => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });

      setPostKey(querySnapshot.docs[querySnapshot.docs.length - 1]);

      return posts;
    }
  });

  // 인피니티 스크롤
  useEffect(() => {
    if (inView) {
      handleScroll();

      // console.log('끝');
    }
  }, [inView]);

  const handleScroll = async () => {
    const morePost = await loadMore();
    if (morePost) {
      const newPosts = Object.values(morePost);
      dispatch(postsActions.handlePostsList(newPosts));
    }
  };

  const loadMore = async () => {
    if (!postKey) {
      return;
    }

    const postsQuery = query(
      collection(db, 'posts'),
      where('title', '>=', searchValue),
      where('title', '<=', searchValue + '\uf8ff'),
      orderBy('timeStamp', 'desc'),
      startAfter(postKey),
      limit(postsCount)
    );

    const querySnapshot = await getDocs(postsQuery);
    const posts = {};
    querySnapshot.forEach((doc) => {
      posts[doc.id] = { id: doc.id, ...doc.data() };
    });

    if (querySnapshot.empty === 0) {
      return;
    }
    setPostKey(querySnapshot.docs[querySnapshot.docs.length - 1]);

    return posts;
  };

  useEffect(() => {
    if (data) {
      const posts = Object.values(data);
      dispatch(postsActions.handleStartPostList(posts));
    }
  }, [data]);

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

  if (posts.length > 0) {
    content = (
      <>
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </>
    );
  } else if (posts.length === 0 && !isLoading) {
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
      <PostListWrapper>{content}</PostListWrapper>
      <End ref={postRef}></End>
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

const End = styled.div`
  height: 1px;
`;
