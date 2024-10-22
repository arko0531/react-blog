import React from 'react';
import Button from '../../components/ui/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DetailPostPage = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/posts/:postID/edit');
  };

  const handleDelete = () => {};
  navigate('/');
  return (
    <>
      <ButtonWrapper>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonWrapper>
      <Content>
        <h1>title</h1>
        <p>date 2024 ;12; 22</p>
        <div>
          <ImgBox src="" alt="" />
          <br />
          <p>content sa d aw sd aw sdd was </p>
        </div>
      </Content>
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
