import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/button/Button';

const LoginAndLogoutButtonGroup = ({ isLogin, onRegister }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate(-1);
  };

  return (
    <ButtonWrapper>
      <Button type="submit">{isLogin === 'login' ? 'Login' : 'SignUp'}</Button>

      {isLogin === 'login' ? (
        <Button type="button" onClick={onRegister} $bgColor="white">
          register
        </Button>
      ) : (
        <Button type="button" $bgColor="white" onClick={handleLogin}>
          Login
        </Button>
      )}
    </ButtonWrapper>
  );
};

export default LoginAndLogoutButtonGroup;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 10px;
`;
