import Button from 'components/ui/button/Button';
import styled from 'styled-components';
import { PostProps } from 'types/post-interface';

const Pagination = ({
  onPrevClick,
  onNextClick,
  prevDisabled,
  nextDisabled
}: PostProps) => {
  return (
    <PaginationWrapper>
      <Button
        onClick={onPrevClick}
        disabled={prevDisabled}
        $disabled={prevDisabled}
      >
        Prev
      </Button>
      <Button
        onClick={onNextClick}
        disabled={nextDisabled}
        $disabled={nextDisabled}
      >
        Next
      </Button>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
`;
