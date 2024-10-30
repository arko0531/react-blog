import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
import {
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { db } from 'firebase.js';
import PostCard from 'components/post/card/PostCard';
import Button from 'components/ui/Button';

const PostList = () => {
  const { firstPostKey, setFirstPostKey, lastPostKey, setLastPostKey } =
    useOutletContext();
  const [page, setPage] = useState(1);
  const [snapshotLength, setSnapshotLength] = useState(null);

  const postsCount = 6;
  const searchValue = useSelector((state) => state.posts.searchValue);
  const posts = useSelector((state) => state.posts.posts);

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

      setLastPostKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setFirstPostKey(querySnapshot.docs[0]);

      setSnapshotLength(querySnapshot.length);

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

  // prev, next 각각
  const loadMore = async (isNext) => {
    if (!lastPostKey || !firstPostKey) {
      return;
    }

    if (snapshotLength < 6) {
      return;
    }

    const postsQuery = isNext
      ? query(
          // next
          collection(db, 'posts'),
          where('title', '>=', searchValue),
          where('title', '<=', searchValue + '\uf8ff'),
          orderBy('timeStamp', 'desc'),
          startAfter(lastPostKey),
          limit(postsCount)
        )
      : query(
          // prev
          collection(db, 'posts'),
          where('title', '>=', searchValue),
          where('title', '<=', searchValue + '\uf8ff'),
          orderBy('timeStamp', 'desc'),
          endBefore(firstPostKey),
          limitToLast(postsCount)
        );

    const querySnapshot = await getDocs(postsQuery);
    const posts = {};
    querySnapshot.forEach((doc) => {
      posts[doc.id] = { id: doc.id, ...doc.data() };
    });

    if (querySnapshot.empty) {
      console.log('비어있음');
      return;
    }

    setLastPostKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setFirstPostKey(querySnapshot.docs[0]);
    setSnapshotLength(querySnapshot.length);

    return posts;
  };

  // prev
  const handlePrevPosts = async () => {
    const morePost = await loadMore(false);

    if (morePost) {
      const newPosts = Object.values(morePost);
      dispatch(postsActions.handlePostsList(newPosts));
      setPage(page - 1);
    }
  };

  // next
  const handleNextPosts = async () => {
    const morePost = await loadMore(true);

    if (morePost) {
      const newPosts = Object.values(morePost);
      dispatch(postsActions.handlePostsList(newPosts));
      setPage(page + 1);
    }
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

  if (posts.length > 0) {
    content = (
      <>
        <PostListWrapper>
          {posts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </PostListWrapper>
        <Pagination>
          {page !== 1 && <Button onClick={handlePrevPosts}>Prev</Button>}
          {posts?.length === 6 && (
            <Button onClick={handleNextPosts}>Next</Button>
          )}
        </Pagination>
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
`;
