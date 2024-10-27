import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { auth, db } from 'firebase.js';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { queryClient } from 'util/http';

const Navigator = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const user = auth.currentUser;

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const userQuery = query(
        collection(db, 'users'),
        where('email', '==', user.email)
      );

      const querySnapshot = await getDocs(userQuery);
      const userData = {};
      querySnapshot.forEach((doc) => {
        userData[doc.id] = { id: doc.id, ...doc.data() };
      });
      return userData[Object.keys(userData)[0]];
    },
    enabled: !!user
  });

  let userName;

  if (data) {
    userName = data.name + '님';
  }
  if (user && user.displayName) {
    // 구글 로그인 시
    userName = user.displayName + '님';
  }

  const handleLogout = async () => {
    try {
      const signOutData = await signOut(auth);
      userName = '';
      queryClient.clear();
      navigate('/');
    } catch (error) {
      alert('로그아웃 실패');
    }
  };

  return (
    <Nav>
      <User>{user && userName}</User>
      {!isLogin ? (
        <NavText to="/auth?mode=login">Login</NavText>
      ) : (
        <NavButton onClick={handleLogout}>Logout</NavButton>
      )}
      <NavText to="/">Home</NavText>
      {isLogin && <NavText to="/posts/new">New Post</NavText>}
    </Nav>
  );
};

export default Navigator;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: #ececec;
  width: 100%;
`;

const NavText = styled(NavLink)`
  font-size: 24px;
  font-weight: 500;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 50px;

  &:hover {
    font-size: 30px;
    background-color: #ffffff80;
  }
  &.active {
    font-size: 32px;
    font-weight: 700;
    background-color: #ffffff80;
  }
`;

const NavButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  border: none;
  background-color: transparent;
  color: #ececec;
  padding: 0px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;

  &:hover {
    font-size: 26px;
    font-weight: 700;
    background-color: #ffffff80;
  }
`;

const User = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 30px;
  border-bottom: solid 1px #ececec;
`;
