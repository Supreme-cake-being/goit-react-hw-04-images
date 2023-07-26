import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryList, Error } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import fetchFromApi from '../../services/pixabay-api';
import Loader from 'components/Loader/Loader';

const ImageGallery = ({ searchQuery }) => {
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (!firstLoad) {
      loadImages();
    }
    setFirstLoad(false);
  }, [searchQuery]);

  useEffect(() => {
    if (!firstLoad) {
      loadMoreImages();
    }
  }, [page]);

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  const loadImages = async () => {
    setPage(1);
    setResults([]);
    setIsLoading(true);
    setError('');

    try {
      const response = await fetchFromApi(searchQuery, page);
      const { data } = response;
      setTotalResults(data.totalHits);
      setResults([...data.hits]);
      setIsLoading(false);

      if (data.totalHits === 0) {
        setError('No results');
      }
    } catch (error) {
      setIsLoading(false);
      setError('Something went wrong. Try reloading the page');
    }
  };

  const loadMoreImages = async () => {
    setIsLoading(true);

    try {
      const response = await fetchFromApi(searchQuery, page);
      const { data } = response;
      setResults([...results, ...data.hits]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Something went wrong. Try reloading the page');
    }
  };

  return (
    <>
      {totalResults !== 0 ? (
        <ImageGalleryList>
          {results.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              tags={tags}
              largeImage={largeImageURL}
            />
          ))}
        </ImageGalleryList>
      ) : (
        error && <Error>{error}</Error>
      )}

      {isLoading && <Loader />}

      {isLoading ||
        results.length === 0 ||
        (totalResults > results.length && (
          <Button onClick={handleLoadMoreClick} />
        ))}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = { searchQuery: PropTypes.string.isRequired };
