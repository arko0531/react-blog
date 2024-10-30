import styled from 'styled-components';
import PostCard from 'components/post/card/PostCard';
import Pagination from 'components/pagination/Pagination';

const PostList = ({ posts, onPrevClick, onNextClick, page }) => {
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
        prevDisabled={page === 1}
        $prevDisabled={page === 1}
        nextDisabled={posts?.length < 6}
        $nextDisabled={posts?.length < 6} // 딱 6개일 때도 활성화 됨 (나중에 수정 필요)
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
