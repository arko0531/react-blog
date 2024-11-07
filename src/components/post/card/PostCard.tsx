import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getPostingDate } from 'util/dateFormat';
import { PostInfo } from 'types/post-interface';

const PostCard = ({ post }: { key: string; post: PostInfo }) => {
  const navigate = useNavigate();

  return (
    <PostBox>
      <div
        onClick={() => {
          navigate(`/posts/${post.postId}`);
        }}
      >
        <ImgBox src={post.imageURL} alt={post.imageName} />

        <div>
          <br />
          <h2>{post.title}</h2>
          <br />
          <p>{getPostingDate(post.timeStamp)} </p>
        </div>
      </div>
    </PostBox>
  );
};

export default PostCard;

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  width: 370px;
  border-top: 2px solid #0554f2;
  border-bottom: 2px solid #0554f2;
  height: 450px;
  gap: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  cursor: pointer;

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
