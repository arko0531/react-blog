import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Error = ({ title, message, error }) => {
  const navigate = useNavigate();

  return (
    <ErrorWrapper>
      <Title>{title}</Title>

      <Message>{message}</Message>
      <p>{error}</p>
      <HomeLink
        onClick={() => {
          navigate('/');
        }}
      >
        메인으로 돌아가기
      </HomeLink>
    </ErrorWrapper>
  );
};

export default Error;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.div`
  font-size: 50px;
`;

const Message = styled.div`
  font-size: 24px;
`;

const HomeLink = styled.p`
  color: #0554f2;
  text-decoration: underline;
  cursor: pointer;
`;
