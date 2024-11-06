import SearchForm from 'components/form/SearchForm';
import styled from 'styled-components';
import { SearchInfo } from 'types/post-interface';

const SearchBar = ({ onSearchPost, onSearchChange, search }: SearchInfo) => {
  return (
    <SearchWrapper>
      <SearchForm
        onSearchPost={onSearchPost}
        onSearchChange={onSearchChange}
        search={search}
      />
    </SearchWrapper>
  );
};

export default SearchBar;

const SearchWrapper = styled.div`
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
