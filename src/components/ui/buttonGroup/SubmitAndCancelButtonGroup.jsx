import Button from 'components/ui/button/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SubmitAndCancelButtonGroup = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <ButtonWrapper>
      <Button type="submit"> 작성</Button>
      <Button type="button" $bgColor="white" onClick={handleCancel}>
        취소
      </Button>
    </ButtonWrapper>
  );
};

export default SubmitAndCancelButtonGroup;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: flex-end;
  gap: 20px;
`;
