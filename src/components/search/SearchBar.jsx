import React from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';

const SearchBar = () => {
  return (
    <Search>
      <SearchInput />
      <Button width="60" $bgColor="blue" color="white">
        검색
      </Button>
    </Search>
  );
};

export default SearchBar;

const Search = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-bottom: 40px;
  gap: 10px;
`;

const SearchInput = styled.input`
  width: 250px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid gray;
`;
