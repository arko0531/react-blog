import React from 'react';
import Button from '../../components/ui/Button';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const DetailPostPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isLogin = useSelector(state => state.auth.isLogin);

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', params.postId],
    queryFn: async () => {
      const q = query(collection(db, 'posts'), where('postId', '==', params.postId));

      const querySnapshot = await getDocs(q);
      const posts = {};
      querySnapshot.forEach(doc => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });
      return posts[Object.keys(posts)[0]];
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

  if (!data) {
    content = <p>현재 포스트가 없습니다.</p>;
  }

  if (data) {
    content = (
      <>
        <h1>{data.title}</h1>
        <PostingDate>작성일 : {data.postingDate}</PostingDate>
        <div>
          <ImgBox src={data.imageURL} alt="post image" />
          <br />
          <ContentText>{data.content}</ContentText>
        </div>
      </>
    );
  }

  const handleEdit = () => {
    // 수정
    navigate(`/posts/${params.postId}/edit`);
  };

  const handleDelete = () => {
    // 삭제해야됨
    navigate('/');
  };

  return (
    <PostContainer>
      <ButtonWrapper>
        {isLogin && (
          <>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </>
        )}
      </ButtonWrapper>
      <Content>{content}</Content>
    </PostContainer>
  );
};

export default DetailPostPage;

const PostContainer = styled.div`
  width: 1200px;
  margin: 60px auto;
  padding: 30px 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;

const ImgBox = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h1 {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

const ContentText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  text-align: justify;
  margin-top: 16px;
`;
const PostingDate = styled.p`
  color: #6b6868d3;
  width: 100%;
  text-align: right;
`;
