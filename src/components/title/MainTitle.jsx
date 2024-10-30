import styled from 'styled-components';

const MainTitle = ({ children }) => {
  return <Title>{children}</Title>;
};

export default MainTitle;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;
