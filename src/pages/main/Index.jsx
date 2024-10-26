import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostList from 'components/post/PostList';
import Button from 'components/ui/Button';

const MainPostPage = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const handleWritePost = () => {
    navigate('/posts/new');
  };

  return (
    <>
      <ButtonWrapper>
        {isLogin && <Button onClick={handleWritePost}>New</Button>}
      </ButtonWrapper>

      <PostList />
    </>
  );
};

export default MainPostPage;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
