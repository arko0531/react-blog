import React from 'react';
import styled from 'styled-components';
import { ButtonProps } from 'types/ui-interface';

const Button = ({
  children,
  $color,
  $width,
  $bgColor,
  $disabled,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $color={$color}
      $width={$width}
      $bgColor={$bgColor}
      $disabled={$disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ $bgColor, $disabled }) =>
    $bgColor ? $bgColor : $disabled ? '#d9d9d9f8' : '#ffdd1ef9'};
  width: ${({ $width }) => ($width ? `${$width}px` : '100px')};
  color: ${({ $color }) => ($color ? `${$color}` : 'black')};
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  border: none;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: ${({ $bgColor, $disabled }) =>
      $disabled ? 'none' : !$bgColor || 'white' ? '#f9bb03' : '#4e7cd6'};
  }
`;
