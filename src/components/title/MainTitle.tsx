import styled from 'styled-components';
import { TitleProps } from 'types/title-interface';

const MainTitle = ({ children }: TitleProps) => {
  return <Title>{children}</Title>;
};

export default MainTitle;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;
