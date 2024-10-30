import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
import {
  collection,
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
import PostList from 'components/post/postList/PostList';
import MainTitle from 'components/title/MainTitle';

const Post = () => {
  const { firstPostKey, setFirstPostKey, lastPostKey, setLastPostKey } =
    useOutletContext();
  const [page, setPage] = useState(1);
  const [snapshotLength, setSnapshotLength] = useState(null);

  const postsCount = 6;
  const searchValue = useSelector((state) => state.posts.searchValue);
  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();

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

    const postsQuery = query(
      // next
      collection(db, 'posts'),
      where('title', '>=', searchValue),
      where('title', '<=', searchValue + '\uf8ff'),
      orderBy('timeStamp', 'desc'),
      isNext ? startAfter(lastPostKey) : endBefore(firstPostKey),
      isNext ? limit(postsCount) : limitToLast(postsCount)
    );

    const querySnapshot = await getDocs(postsQuery);
    const posts = {};
    querySnapshot.forEach((doc) => {
      posts[doc.id] = { id: doc.id, ...doc.data() };
    });

    if (querySnapshot.empty) {
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

  if (isLoading) return <p>로딩 중...</p>;

  if (posts.length === 0) {
    if (searchValue === '') return <p>현재 게시글이 없습니다.</p>;
    return <p>검색 결과가 없습니다.</p>;
  }

  return (
    <>
      <MainTitle>{searchValue === '' ? 'POSTS' : '검색 결과'}</MainTitle>
      {error ? (
        <>
          <p>오류가 발생했습니다.</p>
          <p> {error.message}</p>
        </>
      ) : (
        <PostList
          posts={posts}
          onPrevClick={handlePrevPosts}
          onNextClick={handleNextPosts}
          page={page}
        />
      )}
    </>
  );
};

export default Post;
