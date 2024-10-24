import React from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <ModalWrapper>
      <ModalContainer>
        <p>{message}</p>
        <ButtonWrapper>
          <Button onClick={onConfirm}>확인</Button>
          <Button $bgColor="white" onClick={onCancel}>
            취소
          </Button>
        </ButtonWrapper>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  p {
    padding: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
`;
