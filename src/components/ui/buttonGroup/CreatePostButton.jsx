import styled from 'styled-components';
import Button from 'components/ui/button/Button';

const CreatePostButton = ({ onWritePost }) => {
  return (
    <ButtonWrapper>
      <Button onClick={onWritePost}>New</Button>
    </ButtonWrapper>
  );
};

export default CreatePostButton;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
