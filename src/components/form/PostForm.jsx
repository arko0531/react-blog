import React from 'react';
import styled from 'styled-components';
import Input from '../ui/Input';
import Button from '../ui/Button';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [attachment, setAttachment] = useState();

  const navigator = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ['formData'],
    mutationFn: ({ title, content, postingDate, userEmail, postId }) =>
      axios.post('https://react-blog-cf942-default-rtdb.firebaseio.com/posts.json', {
        title,
        content,
        postingDate,
        userEmail,
        postId,
      }),
  });

  const handleWritePost = async e => {
    e.preventDefault();

    // 파일
    const storage = getStorage();
    const fileRef = ref(storage, uuidv4());
    await uploadString(fileRef, attachment, 'data_url');

    // 날짜
    const date = getPostingDate();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const postingDate = date;
    const userEmail = 'aaa@abc.kr'; // 임시
    const postId = uuidv4();

    mutate({ title, content, postingDate, userEmail, postId });

    setAttachment('');
    navigator('/');
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

    return year + '년' + month + '월' + day + '일';
  };

  return (
    <Wrapper>
      <StyledPostForm onSubmit={handleWritePost}>
        <PostTitle>새 게시글 작성</PostTitle>

        <Input label="제목" type="text" id="title" width="700" placeholder="제목을 입력해주세요." required />
        <Input
          label="내용"
          type="text"
          id="content"
          width="700"
          height="300"
          placeholder="내용을 입력해주세요."
          required
        />
        <Input
          label="이미지"
          type="file"
          id="image"
          width="600"
          placeholder="제목을 입력해주세요."
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <ButtonWrapper>
          <Button type="submit">작성</Button>
        </ButtonWrapper>
      </StyledPostForm>
    </Wrapper>
  );
};

export default PostForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPostForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const PostTitle = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
`;

// 날짜는 자동 입력
