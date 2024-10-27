import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
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
  const [key, setKey] = useState(null); // 마지막으로 불러온 스냅샷의 개수
  const throttle = useRef(null); // 쓰로틀링 처리

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('mode');
  const posts = useSelector((state) => state.posts.posts);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const postsQuery = query(collection(db, 'posts'), limit(6));

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

  const loadMore = async () => {
    const postsQuery = query(
      collection(db, 'posts'),
      startAfter(key),
      limit(6)
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

  const handleScroll = () => {
    if (!throttle.current) {
      throttle.current = setTimeout(async () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
          const morePost = await loadMore();
          if (morePost) {
            const newPosts = Object.values(morePost);
            dispatch(postsActions.handleSearchPostsResult(newPosts));
          }
          throttle.current = null;
        }
      }, 500); // 0.5초

      // console.log('도달');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    if (data) {
      const posts = Object.values(data);
      dispatch(postsActions.handleSearchPostsResult(posts));
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
