import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  // 검색 쿼리 실행
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', { search: search }],
    queryFn: async ({ queryKey }) => {
      const searchValue = queryKey[1].search;
      console.log(searchValue);
      const q = query(
        collection(db, 'posts'),
        where('title', '>=', searchValue),
        where('title', '<=', searchValue + '\uf8ff'),
      );

      const querySnapshot = await getDocs(q);
      const posts = {};
      querySnapshot.forEach(doc => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });
      return posts;
    },
    enabled: !!search,
  });

  const handelSearchPost = e => {
    e.preventDefault();
    const searchValue = e.target.search.value.trim();

    if (searchValue) {
      setSearch(searchValue);
    }
  };

  let content;

  if (isLoading) {
    content = <p>검색 중...</p>;
  }

  if (error) {
    content = (
      <>
        <p>검색 오류 발생</p>
        <p> {error.message}</p>
      </>
    );
  }

  if (data && Object.keys(data).length > 0) {
    const posts = Object.values(data);

    content = (
      <>
        <div>
          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  if (!data && !isLoading && search) {
    content = <p>검색 결과가 없습니다.</p>;
  }

  return (
    <Search>
      <SearchForm onSubmit={handelSearchPost}>
        <SearchInput id="search" name="search" placeholder="검색어를 입력하세요..." />
        <Button type="submit" width="60">
          검색
        </Button>
      </SearchForm>

      {content}
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
