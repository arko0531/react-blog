import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter
} from 'firebase/firestore';
import { db } from 'firebase.js';
import PostCard from 'components/post/card/PostCard';

const PostList = () => {
  const { ref: postRef, inView } = useInView({
    threshold: 1
  });
  const [key, setKey] = useState(null);
  const postsCount = 6;

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('mode');
  const posts = useSelector((state) => state.posts.posts);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const postsQuery = query(collection(db, 'posts'), limit(postsCount));

      const querySnapshot = await getDocs(postsQuery);
      const posts = {};
      querySnapshot.forEach((doc) => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });

      setKey(querySnapshot.docs[querySnapshot.docs.length - 1]);

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
      dispatch(
        postsActions.handleSearchPostsResult({
          posts: newPosts,
          reset: false
        })
      );
    }
  };

  const loadMore = async () => {
    const postsQuery = query(
      collection(db, 'posts'),
      startAfter(key),
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
    setKey(querySnapshot.docs[querySnapshot.docs.length - 1]);

    return posts;
  };

  useEffect(() => {
    if (data) {
      const posts = Object.values(data);
      dispatch(
        postsActions.handleSearchPostsResult({ posts: posts, reset: true })
      );
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
      <PostListWrapper>
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
        <End ref={postRef}></End>
      </PostListWrapper>
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

const End = styled.div`
  height: 1px;
`;
