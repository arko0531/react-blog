import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Navigator = () => {
  return (
    <Nav>
      <NavText to="/">Home</NavText>
      <NavText to="/auth">Login</NavText>
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
