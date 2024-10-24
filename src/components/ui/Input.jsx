import React from 'react';
import styled from 'styled-components';

const Input = ({ formMargin, label, id, ...props }) => {
  return (
    <FormInputWrapper formMargin={formMargin}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormInput id={id} name={id} {...props} />
    </FormInputWrapper>
  );
};

export default Input;

const FormLabel = styled.label`
  font-size: 18px;
`;

const FormInput = styled.input`
  padding: 10px;

  width: ${({ width }) => (width ? `${width}` : '400px')};
  height: ${({ height }) => (height ? `${height}` : '40px')};
`;

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;
