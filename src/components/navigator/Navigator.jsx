import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';

const Navigator = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.auth.isLogin);

  const handleLoginout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      alert('로그아웃 실패');
    }
  };

  return (
    <Nav>
      <NavText to="/">Home</NavText>
      {!isLogin ? (
        <NavText to="/auth?mode=login">Login</NavText>
      ) : (
        <LogoutButton onClick={handleLoginout}>Logout</LogoutButton>
      )}
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
