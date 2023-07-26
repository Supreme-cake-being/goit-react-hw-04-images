import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  ImageGalleryItemBox,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ image, tags, largeImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ImageGalleryItemBox>
      <ImageGalleryItemImage onClick={toggleModal} src={image} alt={tags} />
      {isModalOpen && <Modal onClose={toggleModal} image={largeImage} />}
    </ImageGalleryItemBox>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
