import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navigator from '../navigator/Navigator';
import SearchBar from '../search/SearchBar';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { authActions } from '../../store/reducers/auth';
import { auth } from '../../firebase';

const SideBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLogin = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(authActions.login());
        //console.log(user);
      } else {
        dispatch(authActions.logout());
      }
    });

    return () => isLogin();
  }, [dispatch]);

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
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 10px rgba(0, 0, 0, 0.23);
`;

const OutletStyled = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 90%;
`;
