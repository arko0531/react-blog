import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../store/reducers/posts';

const Navigator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);

  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      alert('로그아웃 실패');
    }
  };

  const handleResetSearchResult = () => {
    dispatch(postsActions.handleSearchPostsResult(null));
    dispatch(postsActions.hadleFoundSerchResult(true));
  };

  return (
    <Nav>
      {user && <User>{user.email} 님</User>}
      {!isLogin ? (
        <NavText to="/auth?mode=login">Login</NavText>
      ) : (
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      )}
      <NavText to="/" onClick={handleResetSearchResult}>
        Home
      </NavText>
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

const LogoutButton = styled.button`
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
