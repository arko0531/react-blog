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
    <>
      <PostListWrapper>
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </PostListWrapper>

      <Pagination
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        prevDisabled={prevDisabled}
        $prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
        $nextDisabled={nextDisabled}
      />
    </>
  );
};

export default PostList;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 70px;
  flex-grow: 1;
  justify-content: start;
  flex-flow: row wrap;
`;
