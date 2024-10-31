import styled from 'styled-components';
import PostCard from 'components/post/card/PostCard';
import Pagination from 'components/pagination/Pagination';

const PostList = ({
  posts,
  onPrevClick,
  onNextClick,
  prevDisabled,
  nextDisabled
}) => {
  return (
    <Container>
      <PostListWrapper>
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </PostListWrapper>

      <Pagination
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
      />
    </Container>
  );
};

export default PostList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  > div {
    &:nth-of-type(2) {
      margin-top: 20px;
      justify-content: center;
      gap: 30px;
    }
  }
`;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 70px;
  flex-grow: 1;
  justify-content: start;
  flex-flow: row wrap;
`;
