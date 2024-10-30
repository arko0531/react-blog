import Button from 'components/ui/button/Button';
import styled from 'styled-components';

const Pagination = ({
  onPrevClick,
  onNextClick,
  prevDisabled,
  nextDisabled,
  $prevDisabled,
  $nextDisabled
}) => {
  return (
    <>
      <PaginationWrapper>
        <Button
          onClick={onPrevClick}
          disabled={prevDisabled}
          $disabled={$prevDisabled}
        >
          Prev
        </Button>
        <Button
          onClick={onNextClick}
          disabled={nextDisabled}
          $disabled={$nextDisabled}
        >
          Next
        </Button>
      </PaginationWrapper>
    </>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
`;
