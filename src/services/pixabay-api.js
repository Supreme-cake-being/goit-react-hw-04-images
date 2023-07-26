import axios from 'axios';

const apiKey = `37049181-477cd3b08f8c43486a46fa1dd`;
const baseUrl = `https://pixabay.com/api/`;

const fetchFromApi = async (searchQuery, page) => {
  const results = await axios.get(`${baseUrl}`, {
    params: {
      key: apiKey,
      q: searchQuery,
      per_page: 12,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return results;
};

export default fetchFromApi;
