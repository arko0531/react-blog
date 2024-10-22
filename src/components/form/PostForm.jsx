import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';

const PostForm = () => {
  return (
    <Wrapper>
      <StyledPostForm>
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
        <Input label="이미지" type="file" id="image" width="600" placeholder="제목을 입력해주세요." required />

        <ButtonWrapper>
          <Button>작성</Button>
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

const StyledPostForm = styled(Form)`
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
