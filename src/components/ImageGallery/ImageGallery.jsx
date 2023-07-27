import PropTypes from 'prop-types';

import { ImageGalleryList, Error } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'components/Loader/Loader';

const ImageGallery = ({
  images = [],
  totalImages = 0,
  loadingStatus = false,
  errorMessage = '',
  onClick,
}) => {
  return (
    <>
      {totalImages !== 0 ? (
        <ImageGalleryList>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              tags={tags}
              largeImage={largeImageURL}
            />
          ))}
        </ImageGalleryList>
      ) : (
        errorMessage && <Error>{errorMessage}</Error>
      )}

      {loadingStatus && <Loader />}

      {loadingStatus ||
        images.length === 0 ||
        (totalImages > images.length && <Button onClick={onClick} />)}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalImages: PropTypes.number.isRequired,
  loadingStatus: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
