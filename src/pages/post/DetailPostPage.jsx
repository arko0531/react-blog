import React from 'react';
import Button from '../../components/ui/Button';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DetailPostPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isLogin = useSelector(state => state.auth.isLogin);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', params.postId],
    queryFn: async () => {
      const response = await axios.get(
        // `https://react-blog-cf942-default-rtdb.firebaseio.com/posts/${params.postId}.json`, // postId 대신 파이어베이스 고유키 가져오기
        `https://react-blog-cf942-default-rtdb.firebaseio.com/posts.json`, // postId 대신 파이어베이스 고유키 가져오기
      );
      return response.data;
    },
  });

  let content;

  if (isLoading) {
    content = <p>로딩 중...</p>;
  }

  if (error) {
    content = (
      <>
        <p>오류가 발생했습니다.</p>
        <p> {error.message}</p>
      </>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    content = <p>현재 포스트가 없습니다.</p>;
  }

  if (data) {
    content = (
      <>
        <Content>
          <h1>{data.title}</h1>
          <p>{data.postingData}</p>
          <div>
            <ImgBox src={data.imageURL} alt="post image" />
            <br />
            <p>{data.content}</p>
          </div>
        </Content>
      </>
    );
  }

  const handleEdit = () => {
    navigate('/posts/:postID/edit');
  };

  const handleDelete = () => {
    navigate('/');
  };

  return (
    <>
      <ButtonWrapper>
        {isLogin && (
          <>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </>
        )}
      </ButtonWrapper>
      {content}
    </>
  );
};

export default DetailPostPage;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;

const ImgBox = styled.img`
  width: 700px;
  height: 400px;
`;

const Content = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h1 {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 20px;
  }
`;
