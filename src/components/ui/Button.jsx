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
  background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : '#ffdd1ef9')};
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  color: ${({ color }) => (color ? `${color}` : 'black')};
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  border: none;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: ${({ $bgColor }) => (!$bgColor || 'white' ? '#ffe554f8' : '#4e7cd6')};
  }
`;
