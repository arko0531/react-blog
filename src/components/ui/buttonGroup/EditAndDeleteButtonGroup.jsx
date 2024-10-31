import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { auth } from 'firebase.js';
import Button from 'components/ui/button/Button';
import Modal from 'components/modal/Modal';

const EditAndDeleteButtonGroup = ({ onEdit, onDelete, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = auth.currentUser; // 현재 로그인한 사용자

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ButtonWrapper>
        {isLogin && user?.email === data?.userEmail && (
          <>
            <Button $width="70" onClick={onEdit}>
              Edit
            </Button>
            <Button $width="70" $bgColor="white" onClick={openModal}>
              Delete
            </Button>
          </>
        )}
      </ButtonWrapper>

      {isModalOpen && (
        <Modal
          message="정말 삭제하시겠습니까?"
          onConfirm={() => {
            onDelete();
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
    </>
  );
};

export default EditAndDeleteButtonGroup;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;
