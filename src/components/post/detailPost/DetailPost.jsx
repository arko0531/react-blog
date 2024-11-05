import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { auth, db } from 'firebase.ts';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import Button from 'components/ui/button/Button';
import Modal from 'components/modal/Modal';
import DetailPostBox from 'components/post/detailPost/DetailPostBox';

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
      await deleteDoc(postDocRef);
      await deleteObject(imageRef);
    },
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      alert('에러 발생 : ' + error);
    }
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 수정
  const handleEdit = () => {
    navigate(`/posts/${params.postId}/edit`);
  };

  const handleDelete = async () => {
    const postDocRef = doc(db, 'posts', data.id);

    try {
      const imageRef = ref(getStorage(), data.imageURL);
      mutate({ postDocRef, imageRef });
    } catch (error) {
      alert('삭제 오류 : ', error);
    }
  };

  if (isLoading) return <p>로딩 중...</p>;

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

      {error ? (
        <>
          <p>오류가 발생했습니다.</p>
          <p> {error.message}</p>
        </>
      ) : (
        <DetailPostBox data={data} />
      )}

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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;
