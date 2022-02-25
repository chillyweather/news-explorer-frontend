/* eslint-disable prettier/prettier */

// import { useState } from 'react';

/* eslint-disable react/prop-types */
function SearchForm({ setIsSearching, handleSearch }) {
  // const [emptySearchError, setEmptySearchError] = useState(false);
  // const errorText = 'Please enter a keyword';
  return (
    <section className="search-form">
      <h2 className="search-form__title">What is going on in the world?</h2>
      <p className="search-form__subtitle">
        Find the latest news on any topic and save them in your personal account.
      </p>
      <form className="search">
        <input type="text" className="search__field" placeholder="Enter topic" />
        <button
          className="search__button"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setIsSearching(true);
            handleSearch();
          }}
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
