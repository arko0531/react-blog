import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';

const Navigator = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const logoutHandler = () => {
    auth.signOut();
    console.log(user);
  };

  return (
    <Nav>
      <NavText to="/">Home</NavText>
      {!user && <NavText to="/auth">Login</NavText>}
      {user && <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>}
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
