import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { db } from 'firebase.ts';
import SearchBar from 'components/search/SearchBar';

const Search = ({ setLastPostKey }) => {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchValue = useSelector((state) => state.posts.searchValue);
  const postsCount = 6;

  const dispatch = useDispatch();

  // 검색 쿼리 실행
  const { data } = useQuery({
    enabled: isSearching,
    queryKey: ['posts', { search: searchValue }],
    queryFn: async ({ queryKey }) => {
      const search = queryKey[1].search;

      const searchQuery = query(
        collection(db, 'posts'),
        where('title', '>=', search),
        where('title', '<=', search + '\uf8ff'),
        orderBy('timeStamp', 'desc'),
        limit(postsCount)
      );

      const querySnapshot = await getDocs(searchQuery);

      const posts = {};

      querySnapshot.forEach((doc) => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });

      return {
        posts,
        searchDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
      };
    }
  });

  const handelSearchPost = (e) => {
    e.preventDefault();
    dispatch(postsActions.setSearchValue(search));

    setSearch('');
    setIsSearching(true);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (isSearching && data) {
      setIsSearching(false);
      setLastPostKey(data.searchDoc);

      const posts = Object.values(data.posts);
      dispatch(postsActions.handlePostsList(posts));
    }
  }, [data, dispatch, isSearching]);

  return (
    <SearchBar
      onSearchChange={handleSearchChange}
      onSearchPost={handelSearchPost}
      search={search}
    />
  );
};

export default Search;
