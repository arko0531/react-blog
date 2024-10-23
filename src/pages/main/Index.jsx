import React from 'react';
import PostList from '../../components/post/PostList';
import Button from '../../components/ui/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainPostPage = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.isLogin.isLogin);

  const handleWritePost = () => {
    navigate('/posts/new');
  };

  return (
    <>
      <ButtonWrapper>{isLogin && <Button onClick={handleWritePost}>New</Button>}</ButtonWrapper>

      <PostList />
    </>
  );
};

export default MainPostPage;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
