import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Post from 'components/post/postList/Post';
import CreatePostButton from 'components/post/button/CreatePostButton';

const MainPostPage = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const handleWritePost = () => {
    navigate('/posts/new');
  };

  return (
    <>
      {isLogin && <CreatePostButton onWritePost={handleWritePost} />}

      <Post />
    </>
  );
};

export default MainPostPage;
