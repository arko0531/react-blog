import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navigator from '../navigator/Navigator';
import SearchBar from '../search/SearchBar';

const SideBar = () => {
  return (
    <Main>
      <Side>
        <Navigator />
      </Side>
      <OutletStyled>
        <SearchBar />
        <Outlet />
      </OutletStyled>
    </Main>
  );
};

export default SideBar;

const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

const Side = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 100px;
  width: 400px;
  height: 100vh;
  background-color: #0554f2;
`;

const OutletStyled = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 90%;
`;
