import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { authActions } from 'store/reducers/auth';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase.js';
import Navigator from 'components/navigator/Navigator';
import Search from 'components/search/Search';

const SideBar = () => {
  const [firstPostKey, setFirstPostKey] = useState();
  const [lastPostKey, setLastPostKey] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const isLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.login(user.accessToken));
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
        <Search setLastPostKey={setLastPostKey} />
        <Outlet
          context={{
            firstPostKey,
            setFirstPostKey,
            lastPostKey,
            setLastPostKey
          }}
        />
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
  position: sticky;
  top: 0px;
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
  padding: 0px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 90%;
`;
