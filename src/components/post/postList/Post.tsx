import React, { useCallback, useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { SearchProps } from 'types/post-interface';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
import {
  collection,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { db } from 'firebase.ts';
import PostList from 'components/post/postList/PostList';
import MainTitle from 'components/title/MainTitle';
import PostButtonWrapper from 'components/ui/PostButtonWrapper';
import styled from 'styled-components';

const Post = () => {
  const {
    firstPostKey,
    setFirstPostKey,
    lastPostKey,
    setLastPostKey
  }: SearchProps = useOutletContext();
  const [page, setPage] = useState<number>(1);
  const [snapshotLength, setSnapshotLength] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const posts = useAppSelector((state) => state.posts.posts);
  const searchValue = useAppSelector((state) => state.posts.searchValue);

  const postsCount = 6;

  const navigate = useNavigate();

  const handleWritePost = () => {
    navigate('/posts/new');
  };

  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('timeStamp', 'desc'),
        limit(postsCount)
      );

      const querySnapshot = await getDocs(postsQuery);

      const posts: { [id: string]: any } = {};

      querySnapshot.forEach((doc) => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });

      if (querySnapshot && setLastPostKey && setFirstPostKey) {
        setLastPostKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setFirstPostKey(querySnapshot.docs[0]);
      }

      return posts;
    }
  });

  // 페이지네이션

  // prev, next 각각
  const loadMore = async (isNext: boolean) => {
    if (!lastPostKey || !firstPostKey) {
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

    const posts: { [id: string]: any } = {};

    querySnapshot.forEach((doc) => {
      posts[doc.id] = { id: doc.id, ...doc.data() };
    });

    if (querySnapshot.empty) {
      return;
    }

    if (querySnapshot && setLastPostKey && setFirstPostKey) {
      setLastPostKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setFirstPostKey(querySnapshot.docs[0]);
    }

    return posts;
  };

  // prev
  const handlePrevPosts = async () => {
    loadPosts('prev');
    setPage(page - 1);
  };

  // next
  const handleNextPosts = () => {
    loadPosts('next');
    setPage(page + 1);
  };

  const loadPosts = async (value: string) => {
    const isNext = value === 'next' ? true : false;

    const morePost = await loadMore(isNext);

    if (morePost) {
      const newPosts = Object.values(morePost);
      dispatch(postsActions.handlePostsList(newPosts));
    }
  };

  // 총 게시글 개수만 구함 (next 비활성화 판단)
  useEffect(() => {
    fetchPostsTotalCount();
  }, [searchValue]);

  const fetchPostsTotalCount = useCallback(async () => {
    const postsColl = query(
      // next
      collection(db, 'posts'),
      where('title', '>=', searchValue),
      where('title', '<=', searchValue + '\uf8ff'),
      orderBy('timeStamp', 'desc')
    );
    const querySnapshot = await getCountFromServer(postsColl);

    const count = querySnapshot.data().count;
    setTotalCount(count);
  }, [totalCount]);

  useEffect(() => {
    if (data) {
      const posts = Object.values(data);
      dispatch(postsActions.handlePostsList(posts));
      fetchPostsTotalCount();
    }
  }, [data, dispatch]);

  if (isLoading) return <p>로딩 중...</p>;

  if (posts.length === 0) {
    if (searchValue === '') return <p>현재 게시글이 없습니다.</p>;
    return <p>검색 결과가 없습니다.</p>;
  }

  return (
    <Container>
      {isLogin && <PostButtonWrapper onWritePost={handleWritePost} />}

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
          prevDisabled={page === 1}
          nextDisabled={totalCount <= page * posts?.length || posts?.length < 6}
        />
      )}
    </Container>
  );
};

export default Post;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  > h1 {
    &:nth-of-type(1) {
      align-items: center;
      margin-bottom: 50px;
      justify-content: center;
      gap: 30px;
    }
  }
`;
