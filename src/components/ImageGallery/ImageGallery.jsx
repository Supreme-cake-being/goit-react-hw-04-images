// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

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
  // const [page, setPage] = useState(1);
  // const [totalResults, setTotalResults] = useState(0);
  // const [results, setResults] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [firstLoad, setFirstLoad] = useState(true);

  // useEffect(() => {
  //   setPage(1);
  //   setTotalResults(0);
  //   setResults([]);
  // }, [searchQuery]);

  // useEffect(() => {
  //   const loadImages = async () => {
  //     setPage(1);
  //     setResults([]);
  //     setIsLoading(true);
  //     setError('');

  //     try {
  //       const response = await fetchFromApi(searchQuery, page);
  //       const { data } = response;
  //       setTotalResults(data.totalHits);
  //       setResults([...data.hits]);
  //       setIsLoading(false);

  //       if (data.totalHits === 0) {
  //         setError('No results');
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       setError('Something went wrong. Try reloading the page');
  //     }
  //   };

  //   if (searchQuery !== '' && page === 1) {
  //     loadImages();
  //   }
  //   setFirstLoad(false);
  // }, [page, searchQuery]);

  // useEffect(() => {
  //   const loadMoreImages = async () => {
  //     setIsLoading(true);

  //     try {
  //       const response = await fetchFromApi(searchQuery, page);
  //       const { data } = response;
  //       setResults(prevResults => [...prevResults, ...data.hits]);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //       setError('Something went wrong. Try reloading the page');
  //     }
  //   };

  //   if (searchQuery !== '' && page !== 1) {
  //     loadMoreImages();
  //   }
  // }, [page, searchQuery]);

  // const handleLoadMoreClick = () => {
  //   setPage(prevPage => prevPage + 1);
  // };

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

// ImageGallery.propTypes = { searchQuery: PropTypes.string.isRequired };
