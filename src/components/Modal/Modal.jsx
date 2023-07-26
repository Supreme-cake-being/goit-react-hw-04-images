import { useEffect, Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, image }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  const closeModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalContainer>
        <img src={image} alt="piska" />
      </ModalContainer>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
