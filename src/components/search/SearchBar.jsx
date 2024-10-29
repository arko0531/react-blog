import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from 'store/reducers/posts';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { db } from 'firebase.js';
import Button from 'components/ui/Button';

const SearchBar = ({ setPostKey }) => {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchValue = useSelector((state) => state.posts.searchValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 검색 쿼리 실행
  const { data } = useQuery({
    queryKey: ['posts', { search: searchValue }],
    queryFn: async ({ queryKey }) => {
      const search = queryKey[1].search;

      const searchQuery = query(
        collection(db, 'posts'),
        where('title', '>=', search),
        where('title', '<=', search + '\uf8ff'),
        orderBy('timeStamp', 'desc'),
        limit(6)
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
    },
    enabled: isSearching
  });

  const handelSearchPost = (e) => {
    e.preventDefault();
    dispatch(postsActions.setSearchValue(search));
    setIsSearching(true);

    navigate(`/?mode=search&value=${search}`);
  };

  useEffect(() => {
    if (isSearching && data) {
      setIsSearching(false);
      setSearch('');

      setPostKey(data.searchDoc);

      const posts = Object.values(data.posts);
      dispatch(postsActions.handleStartPostList(posts));
    }
  }, [data, dispatch, isSearching]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Search>
      <SearchForm onSubmit={handelSearchPost}>
        <SearchInput
          id="search"
          name="search"
          placeholder="검색어를 입력하세요..."
          onChange={handleSearchChange}
          value={search}
        />
        <Button type="submit" $width="60">
          검색
        </Button>
      </SearchForm>
    </Search>
  );
};

export default SearchBar;

const Search = styled.div`
  position: sticky;
  top: 0px;
  background-color: white;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: end;
  padding-bottom: 40px;
  gap: 20px;
`;

const SearchInput = styled.input`
  width: 250px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  margin-right: 10px;
  background-color: #4e7bd613;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: end;
`;
