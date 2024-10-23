import React from 'react';
import Input from '../ui/Input';
import styled from 'styled-components';
import Button from '../ui/Button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ['formData'],
    mutationFn: ({ name, email, password }) =>
      axios.post('https://react-blog-cf942-default-rtdb.firebaseio.com/users.json', { name, password, email }),
    onSuccess: () => {
      setIsLogin(true);
      navigate('/auth');
    },
  });

  async function register(email, password) {
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(auth, email, password);

      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function login(email, password) {
    const auth = getAuth();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      console.log(user);

      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleAuth = async e => {
    e.preventDefault();

    // 회원 가입
    if (!isLogin) {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const passwordConfirm = e.target.passwordCheck.value;

      if (password.length <= 6 && passwordConfirm.length <= 6) {
        alert('비밀번호를 6자리 이상으로 설정해주세요.');
        return;
      }
      if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      mutate({ name, email, password });
      register(email, password);
    }

    // 로그인
    if (isLogin) {
      const email = e.target.email.value;
      const password = e.target.password.value;

      login(email, password);
    }
  };

  // async function handleAuth(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const data = {
  //     email: formData.get('email'),
  //     password: formData.get('passwordCheck'),
  //     name: formData.get('name'),
  //   };
  //   console.log(data);
  //   mutate(data);
  //   // const res = await axios.post('https://react-blog-cf942-default-rtdb.firebaseio.com/users.json', {
  //   //   data,
  //   // });

  //   // console.log(res);
  // }

  return (
    <>
      <StyledAuthForm id="authForm" onSubmit={handleAuth}>
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
              id="passwordCheck"
              type="password"
              width="400"
              placeholder="비밀번호를 다시 입력해 주세요."
              required
            />
            <Input label="Name" type="text" id="name" width="400" placeholder="이름을 입력해 주세요." required />
          </>
        )}
        <ButtonWrapper>
          <Button type="submit">{isLogin ? 'Login' : 'SignUp'}</Button>
        </ButtonWrapper>
      </StyledAuthForm>
    </>
  );
};

export default AuthForm;

// export async function action({ request }) {
//   const data = await request.formData();

//   const signUpData = {
//     email: data.get('email'),
//     password: data.get('passwordCheck'),
//     name: data.get('name'),
//   };

//   // usersData(signUpData);

//   return redirect('/');
// }

// 로그인 / 회원가입 조건부 렌더링

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
  margin-top: 40px;
`;
