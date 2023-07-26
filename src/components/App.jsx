import React, { Component } from 'react';

import { Box } from './App.styled';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '',
  };

  getSearchQuery = newSearchQuery =>
    this.setState({
      query: newSearchQuery,
    });

  render() {
    return (
      <Box>
        <SearchBar onSubmit={this.getSearchQuery} />
        <ImageGallery searchQuery={this.state.query} />
      </Box>
    );
  }
}

export default App;
