import React from 'react';
import Input from '../ui/Input';
import styled from 'styled-components';
import Button from '../ui/Button';
import { useSearchParams } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Firestore 함수 import
import { db, auth } from '../../firebase';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../assets/google-logo.png';

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode');

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async ({ email, name, password }) => {
      await setDoc(doc(db, 'users', email), { email, name, password });
    },
    onSuccess: () => {
      navigate('/auth?mode=login');
      console.log('사용자 정보 저장 성공');
    },
    onError: error => {
      console.error(error);
    },
  });

  const handleAuth = async e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // 로그인
    if (isLogin === 'login') {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (error) {
        alert('로그인 오류 : ' + error);
      }
    }

    // 회원가입
    if (isLogin === 'register') {
      const passwordCheck = e.target.passwordCheck.value;
      const name = e.target.name.value;
      if (password !== passwordCheck) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      } else if (password.length < 6 && passwordCheck.length < 6) {
        alert('비밀번호를 6자리 이상으로 설정해주세요.');
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        mutate({ email, name, password });
      } catch (error) {
        alert('회원가입 오류 : ' + error);
      }
    }
  };

  const handleRegister = () => {
    navigate('/auth?mode=register');
  };

  // 구글 회원가입
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      navigate('/');
    } catch (error) {
      alert('로그인 오류 : ' + error);
    }
  };

  return (
    <>
      <StyledAuthForm id="authForm" onSubmit={handleAuth}>
        <AuthTitle>{isLogin === 'login' ? 'Login' : 'SignUp'}</AuthTitle>
        <Input label="E-mail" type="email" id="email" width="400px" placeholder="이메일을 입력해주세요." required />
        <Input
          label="Password"
          id="password"
          type="password"
          width="400px"
          placeholder="비밀번호를 입력해 주세요."
          required
        />
        {isLogin !== 'login' && (
          <>
            <Input
              label="Password 확인"
              id="passwordCheck"
              type="password"
              width="400px"
              placeholder="비밀번호를 다시 입력해 주세요."
              required
            />
            <Input label="Name" type="text" id="name" width="400px" placeholder="이름을 입력해 주세요." required />
          </>
        )}
        <ButtonWrapper>
          <Button type="submit">{isLogin === 'login' ? 'Login' : 'SignUp'}</Button>

          {isLogin === 'login' && (
            <Button type="button" onClick={handleRegister} $bgColor="white">
              register
            </Button>
          )}
        </ButtonWrapper>
        <Image src={googleLogo} onClick={handleGoogleLogin} />
      </StyledAuthForm>
    </>
  );
};

export default AuthForm;

const AuthTitle = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 50px;
`;

const StyledAuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 10px;
`;

const Image = styled.img`
  margin-top: 40px;
  cursor: pointer;
  width: 45px;
`;
