import styled from 'styled-components';
import { TitleProps } from 'types/title-interface';

const FormTitle = ({ children }: TitleProps) => {
  return <Title>{children}</Title>;
};

export default FormTitle;

const Title = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin: 30px;
  text-align: center;
`;
