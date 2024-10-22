import React from 'react';
import styled from 'styled-components';

const Button = ({ type, onClick, children, ...props }) => {
  return (
    <StyledButton type={type} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  background-color: ${({ bgColor }) => (bgColor ? '#2463e1' : '#ffdd1ef9')};
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  color: ${({ color }) => (color ? `${color}` : 'black')};
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  border: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ bgColor }) => (bgColor ? '#4e7cd6' : '#ffe554f8')};
  }
`;
