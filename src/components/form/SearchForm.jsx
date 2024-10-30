import styled from 'styled-components';
import Button from 'components/ui/button/Button';

const SearchForm = ({ onSearchPost, onSearchChange, search }) => {
  return (
    <SearchFormWrapper onSubmit={onSearchPost}>
      <SearchInput
        id="search"
        name="search"
        placeholder="검색어를 입력하세요..."
        onChange={onSearchChange}
        value={search}
      />
      <Button type="submit" $width="60">
        검색
      </Button>
    </SearchFormWrapper>
  );
};

export default SearchForm;

const SearchInput = styled.input`
  width: 250px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  margin-right: 10px;
  background-color: #4e7bd613;
`;

const SearchFormWrapper = styled.form`
  display: flex;
  flex-direction: row;
  align-items: end;
`;
