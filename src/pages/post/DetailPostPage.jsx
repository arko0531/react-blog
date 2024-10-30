import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from 'util/http';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { auth, db } from 'firebase.js';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { getPostingDate } from 'util/dateFormat';
import Button from 'components/ui/button/Button';
import Modal from 'components/modal/Modal';

const DetailPostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = auth.currentUser; // 현재 로그인한 사용자

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', params.postId],
    queryFn: async () => {
      const paramsQuery = query(
        collection(db, 'posts'),
        where('postId', '==', params.postId)
      );

      const querySnapshot = await getDocs(paramsQuery);
      const posts = {};
      querySnapshot.forEach((doc) => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });
      return posts[Object.keys(posts)[0]];
    }
  });

  const { mutate } = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: async ({ postDocRef, imageRef }) => {
      const deletePost = await deleteDoc(postDocRef);
      const deleteImage = await deleteObject(imageRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']); // 이거 지우면 오류 사라지는데 메인화면 새로고침 안됨
      navigate('/');
    },
    onError: (error) => {
      alert('에러 발생 : ' + error);
    }
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

  if (data) {
    const date = getPostingDate(data.timeStamp);

    content = (
      <>
        <h1>{data.title}</h1>
        <PostingDate>작성자 : {data.userEmail}</PostingDate>
        <PostingDate>작성일 : {date}</PostingDate>
        <div>
          <ImgBox src={data.imageURL} alt="post image" />
          <br />
          <ContentText>{data.content}</ContentText>
        </div>
      </>
    );
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEdit = () => {
    // 수정
    navigate(`/posts/${params.postId}/edit`);
  };

  const handleDelete = async () => {
    const postDocRef = doc(db, 'posts', data.id);
    console.log(postDocRef);
    try {
      const imageRef = ref(getStorage(), data.imageURL);
      mutate({ postDocRef, imageRef });
    } catch (error) {
      alert('삭제 오류 : ', error);
    }
  };

  return (
    <PostContainer>
      <ButtonWrapper>
        {isLogin && user?.email === data?.userEmail && (
          <>
            <Button $width="70" onClick={handleEdit}>
              Edit
            </Button>
            <Button $width="70" $bgColor="white" onClick={openModal}>
              Delete
            </Button>
          </>
        )}
      </ButtonWrapper>
      <Content>{content}</Content>
      {isModalOpen && (
        <Modal
          message="정말 삭제하시겠습니까?"
          onConfirm={() => {
            handleDelete();
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
    </PostContainer>
  );
};

export default DetailPostPage;

const PostContainer = styled.div`
  width: 85%;
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
    margin-bottom: 20px;
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
