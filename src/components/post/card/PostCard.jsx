import React from 'react';
import styled from 'styled-components';

const PostCard = () => {
  return (
    <PostBox>
      <ImgBox src="" alt="" />
      <div>
        <br />
        <h2>title</h2>
        <br />
        <p>dateL 2021 </p>
      </div>
    </PostBox>
  );
};

export default PostCard;

const PostBox = styled.div`
  padding: 10px;
  width: 370px;
  height: 300px;
  border-top: 2px solid #0554f2;
  border-bottom: 2px solid #0554f2;

  h2 {
    font-size: 18px;
    font-weight: 500;
  }
`;

const ImgBox = styled.img`
  height: 200px;
  width: 100%;
`;
