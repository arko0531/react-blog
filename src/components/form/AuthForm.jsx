import React from 'react';
import { Form } from 'react-router-dom';
import Input from '../ui/Input';
import styled from 'styled-components';
import Button from '../ui/Button';

const AuthForm = () => {
  // 임시
  const isLogin = true;

  return (
    <>
      <StyledAuthForm marginTop="20" gap="10">
        <AuthTitle>{isLogin ? 'Login' : 'SignUp'}</AuthTitle>
        <Input label="E-mail" type="email" id="email" width="400" placeholder="이메일을 입력해주세요." required />
        <Input
          label="Password"
          id="password"
          type="password"
          width="400"
          placeholder="비밀번호를 입력해 주세요."
          required
        />
        {!isLogin && (
          <>
            <Input
              label="Password 확인"
              type="password"
              width="400"
              placeholder="비밀번호를 다시 입력해 주세요."
              required
            />
            <Input label="Name" type="text" id="name" width="400" placeholder="이름을 입력해 주세요." required />
          </>
        )}
        <ButtonWrapper>
          <Button>{isLogin ? 'Login' : 'SignUp'}</Button>
        </ButtonWrapper>
      </StyledAuthForm>
    </>
  );
};

export default AuthForm;

// 로그인 / 회원가입 조건부 렌더링

const AuthTitle = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 50px;
`;

const StyledAuthForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
`;
