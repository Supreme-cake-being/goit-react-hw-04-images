import { useState } from 'react';

import { Box } from './App.styled';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [query, setQuery] = useState('');

  const getSearchQuery = newSearchQuery => setQuery(newSearchQuery);

  return (
    <Box>
      <SearchBar onSubmit={getSearchQuery} />
      <ImageGallery searchQuery={query} />
    </Box>
  );
};

export default App;
