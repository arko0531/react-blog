import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginActions } from '../../store/reducers/login';

const Navigator = () => {
  const isLogin = useSelector(state => state.isLogin.isLogin);
  const dispatch = useDispatch();

  const auth = getAuth();
  const user = auth.currentUser;

  const logoutHandler = () => {
    auth.signOut();

    dispatch(isLoginActions.logout());
    alert('로그아웃 되었습니다.');
  };
  console.log(user);

  return (
    <Nav>
      <NavText to="/">Home</NavText>
      {!isLogin && <NavText to="/auth">Login</NavText>}
      {isLogin && <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>}
    </Nav>
  );
};

export default Navigator;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #ececec;
`;

const NavText = styled(NavLink)`
  font-size: 18px;
  font-weight: 500;

  &:hover {
    font-size: 20px;
  }
  &.active {
    font-size: 24px;
    font-weight: 700;
  }
`;

const LogoutButton = styled.button`
  font-size: 18px;
  font-weight: 500;
  border: none;
  background-color: transparent;
  color: #ececec;
  padding: 0px;
  text-align: left;
  cursor: pointer;

  &:hover {
    font-size: 24px;
    font-weight: 700;
  }
`;
