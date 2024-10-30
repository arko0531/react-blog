import styled from 'styled-components';

const TextArea = ({ id, label, ...props }) => {
  return (
    <TextAreaWrapper>
      <FormTextLabel htmlFor={id}>{label}</FormTextLabel>
      <FormTextArea id={id} name={id} {...props} />
    </TextAreaWrapper>
  );
};

export default TextArea;

const FormTextArea = styled.textarea`
  padding: 10px;
  border: none;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

  width: ${({ $width }) => ($width ? `${$width}` : '400px')};
  height: ${({ $height }) => ($height ? `${$height}` : '40px')};
`;

const FormTextLabel = styled.label`
  font-size: 18px;
  margin-top: 20px;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
