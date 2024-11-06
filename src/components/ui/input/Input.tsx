import styled from 'styled-components';
import { InputProps } from 'types/ui-interface';

const Input = ({ id, $width, $height, ...props }: InputProps) => {
  return <StyledInput name={id} $width={$width} $height={$height} {...props} />;
};

export default Input;

const StyledInput = styled.input<InputProps>`
  padding: 10px;
  border: none;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

  width: ${({ $width }) => ($width ? `${$width}` : '400px')};
  height: ${({ $height }) => ($height ? `${$height}` : '40px')};
`;
