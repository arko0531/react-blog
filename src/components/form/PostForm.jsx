import React, { useEffect } from 'react';
import styled from 'styled-components';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { queryClient } from '../../util/http';
import { collection, query, where, doc, setDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const PostForm = () => {
  const [attachment, setAttachment] = useState();
  const [postData, setPostData] = useState('');
  const params = useParams();
  const navigator = useNavigate();

  // 글 생성 / 수정
  const { mutate } = useMutation({
    mutationKey: ['formData'],
    mutationFn: async ({ title, content, postingDate, userEmail, postId, imageURL }) => {
      await setDoc(doc(db, 'posts', postId), {
        title,
        content,
        postingDate,
        userEmail,
        postId,
        imageURL,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      navigator('/');
      if (params) {
        redirect('./');
      }
    },
  });

  // 글 수정
  // 일단 가져옴
  const { data } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: async () => {
      const q = query(collection(db, 'posts'), where('postId', '==', params.postId));

      const querySnapshot = await getDocs(q);
      const posts = {};
      querySnapshot.forEach(doc => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });
      return posts[Object.keys(posts)[0]];
    },
    enabled: !!params.postId,
  });

  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, [data]);

  const handleWritePost = async e => {
    e.preventDefault();
    const user = auth.currentUser;

    // 파일
    const storage = getStorage();
    const fileRef = ref(storage, uuidv4());
    await uploadString(fileRef, attachment, 'data_url');

    const imageURL = await getDownloadURL(fileRef);

    // 날짜
    const date = getPostingDate();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const postingDate = date;
    const userEmail = user.email;
    const postId = params.postId ? params.postId : uuidv4();

    mutate({ title, content, postingDate, userEmail, postId, imageURL });

    setAttachment('');
  };

  const handleFileChange = e => {
    const files = e.target.files;
    const theFile = files[0];

    const reader = new FileReader();

    reader.onloadend = finishedEvent => {
      const result = finishedEvent.currentTarget.result;
      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
  };

  const getPostingDate = () => {
    // 날짜 설정
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    return year + '년 ' + month + '월 ' + day + '일';
  };

  return (
    <Wrapper>
      <StyledPostForm onSubmit={handleWritePost}>
        <PostTitle>{postData ? '게시글 수정' : '새 게시글 작성'}</PostTitle>

        <Input
          label="제목"
          type="text"
          id="title"
          width="100%"
          defaultValue={postData?.title || ''}
          placeholder="제목을 입력해주세요."
          required
        />
        <TextAreaWrapper>
          <TextLabel>내용</TextLabel>
          <TextArea
            label="내용"
            type="text"
            id="content"
            width="100%"
            height="400px"
            placeholder="내용을 입력해주세요."
            defaultValue={postData?.content || ''}
            required
          />
        </TextAreaWrapper>

        <Input type="file" id="image" width="40%" accept="image/*" onChange={handleFileChange} required />

        <ButtonWrapper>
          <Button type="submit"> 작성</Button>
        </ButtonWrapper>
      </StyledPostForm>
    </Wrapper>
  );
};

export default PostForm;

const Wrapper = styled.div`
  width: 85%;
  margin: 60px auto;
  padding: 30px 80px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledPostForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostTitle = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 50px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: flex-end;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

  width: ${({ width }) => (width ? `${width}` : '400px')};
  height: ${({ height }) => (height ? `${height}` : '40px')};
`;

const TextLabel = styled.label`
  font-size: 18px;
  margin-top: 20px;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
