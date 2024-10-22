import React from 'react';
import styled from 'styled-components';

const Input = ({ formMargin, label, id, ...props }) => {
  return (
    <FormInputWrapper formMargin={formMargin}>
      <AuthLabel htmlFor={id}>{label}</AuthLabel>
      <AuthInput id={id} name={id} {...props} />
    </FormInputWrapper>
  );
};

export default Input;

const AuthLabel = styled.label`
  font-size: 18px;
`;

const AuthInput = styled.input`
  padding: 10px;

  width: ${({ width }) => (width ? `${width}px` : '400px')};
  height: ${({ height }) => (height ? `${height}px` : '40px')};
`;

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 20px;
  gap: 10px;
`;
