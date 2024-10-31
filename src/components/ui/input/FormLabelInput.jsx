import Input from 'components/ui/input/Input';
import React from 'react';
import styled from 'styled-components';

const FormLabelInput = ({ label, id, $width, $height, ...props }) => {
  return (
    <FormInputLabelWrapper>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input id={id} $width={$width} $height={$height} {...props} />
    </FormInputLabelWrapper>
  );
};

export default FormLabelInput;

const FormLabel = styled.label`
  font-size: 18px;
`;

const FormInputLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;
