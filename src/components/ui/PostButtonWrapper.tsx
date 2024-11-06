import styled from 'styled-components';
import Button from 'components/ui/button/Button';
import { PostButtonWrapperProps } from 'types/ui-interface';

const PostButtonWrapper = ({ onWritePost }: PostButtonWrapperProps) => {
  return (
    <ButtonWrapper>
      <Button onClick={onWritePost}>New</Button>
    </ButtonWrapper>
  );
};

export default PostButtonWrapper;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
