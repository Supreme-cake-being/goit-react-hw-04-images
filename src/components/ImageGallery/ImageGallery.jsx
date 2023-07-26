import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryList, Error } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import fetchFromApi from '../../services/pixabay-api';
import Loader from 'components/Loader/Loader';

class ImageGallery extends Component {
  state = {
    page: 1,
    totalResults: 0,
    results: [],
    isLoading: false,
    error: '',
  };

  static propTypes = { searchQuery: PropTypes.string.isRequired };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.loadMoreImages();
    }

    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.loadImages();
    }
  }

  handleLoadMoreClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  loadImages = async () => {
    const { page } = this.state;
    const { searchQuery } = this.props;

    this.setState({ page: 1, results: [], isLoading: true, error: '' });

    try {
      const response = await fetchFromApi(searchQuery, page);
      const { data } = response;
      this.setState({
        totalResults: data.totalHits,
        results: [...data.hits],
        isLoading: false,
      });

      if (data.totalHits === 0) {
        this.setState({
          error: 'No results',
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        error: 'Something went wrong. Try reloading the page',
      });
    }
  };

  loadMoreImages = async () => {
    const { page, results } = this.state;
    const { searchQuery } = this.props;

    this.setState({ isLoading: true });

    try {
      const response = await fetchFromApi(searchQuery, page);
      const { data } = response;
      this.setState({ results: [...results, ...data.hits], isLoading: false });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: 'Something went wrong. Try reloading the page',
      });
    }
  };

  render() {
    const { totalResults, results, isLoading, error } = this.state;

    return (
      <>
        {totalResults !== 0 ? (
          <ImageGalleryList>
            {this.state.results.map(
              ({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  image={webformatURL}
                  tags={tags}
                  largeImage={largeImageURL}
                />
              )
            )}
          </ImageGalleryList>
        ) : (
          error && <Error>{error}</Error>
        )}

        {isLoading && <Loader />}

        {isLoading ||
          results.length === 0 ||
          (totalResults > results.length && (
            <Button onClick={this.handleLoadMoreClick} />
          ))}
      </>
    );
  }
}

export default ImageGallery;
