import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <PostBox>
      <Link to={`/posts/${post.postId}`}>
        <ImgBox src={post.imageURL} alt="" />

        <div>
          <br />
          <h2>{post.title}</h2>
          <br />
          <p>{post.postingDate} </p>
        </div>
      </Link>
    </PostBox>
  );
};

export default PostCard;

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 370px;
  border-top: 2px solid #0554f2;
  border-bottom: 2px solid #0554f2;
  height: 450px;
  gap: 10px;

  h2 {
    font-size: 23px;
    font-weight: 500;
  }
  p {
    margin-top: 4px;
  }
`;

const ImgBox = styled.img`
  height: 300px;
  width: 100%;
`;
