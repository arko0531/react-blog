import React from 'react';
import styled from 'styled-components';
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
import { db } from 'firebase.js';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import EditAndDeleteButtonGroup from 'components/ui/buttonGroup/EditAndDeleteButtonGroup';
import DetailPostBox from 'components/post/detailPost/DetailPostBox';

const DetailPost = () => {
  const navigate = useNavigate();
  const params = useParams();

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
      navigate('/');
    },
    onError: (error) => {
      alert('에러 발생 : ' + error);
    }
  });

  const handleEdit = () => {
    // 수정
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

  if (isLoading) return;
  <p>로딩 중...</p>;

  return (
    <PostContainer>
      <EditAndDeleteButtonGroup
        onEdit={handleEdit}
        onDelete={handleDelete}
        data={data}
      />
      {error ? (
        <>
          <p>오류가 발생했습니다.</p>
          <p> {error.message}</p>
        </>
      ) : (
        <DetailPostBox data={data} />
      )}
    </PostContainer>
  );
};

export default DetailPost;

const PostContainer = styled.div`
  width: 85%;
  margin: 60px auto;
  padding: 30px 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
