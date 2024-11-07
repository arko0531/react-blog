import styled from 'styled-components';
import { PostInfo } from 'types/post-interface';
import { getPostingDate } from 'util/dateFormat';

const DetailPostBox = ({ data }: { data: PostInfo }) => {
  return (
    <Content>
      <h1>{data.title}</h1>
      <PostingDate>작성자 : {data.userEmail}</PostingDate>
      <PostingDate>작성일 : {getPostingDate(data.timeStamp)}</PostingDate>
      <div>
        <ImgBox src={data.imageURL} alt={data.imageName} />
        <br />
        <ContentText>{data.content}</ContentText>
      </div>
    </Content>
  );
};

export default DetailPostBox;

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
