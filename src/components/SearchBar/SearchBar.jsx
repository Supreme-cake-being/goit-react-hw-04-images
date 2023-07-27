import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const query = e.target.query.value;

    if (query.trim() !== '') {
      return onSubmit(e.target.query.value);
    }

    e.target.reset();
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <AiOutlineSearch />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          name="query"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

export default SearchBar;

SearchBar.propTypes = { onSubmit: PropTypes.func.isRequired };
