import styled from 'styled-components';

const Input = ({ id, $width, $height, ...props }) => {
  return <StyledInput name={id} $width={$width} $height={$height} {...props} />;
};

export default Input;

const StyledInput = styled.input`
  padding: 10px;
  border: none;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

  width: ${({ $width }) => ($width ? `${$width}` : '400px')};
  height: ${({ $height }) => ($height ? `${$height}` : '40px')};
`;
