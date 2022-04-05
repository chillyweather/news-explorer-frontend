/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react';

// import { useState } from 'react';

/* eslint-disable react/prop-types */
function SearchForm({
  setIsSearching,
  handleSearch,
  // newsCards,
  setNewsCards,
  setKeywords,
  setNotFound,
  searchText,
  setSearchText,
  // keywords,
}) {
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const [emptySearchError, setEmptySearchError] = useState(false);
  const errorText = 'Please enter a keyword';

  function findNews(keyword) {
    const newsResult = [];
    setIsSearching(true);
    handleSearch(keyword).then((res) => {
      const savedArticles = JSON.parse(localStorage.getItem('savedArticles'));
      const links = Array.from(savedArticles, (x) => x.link);
      res.forEach((card) => {
        const newCard = {
          title: card.title,
          text: card.content,
          date: card.publishedAt,
          source: card.source.name,
          link: card.url,
          image: card.urlToImage,
          keyword: `${keyword}`,
        };
        newsResult.push(newCard);
      });
      //  filter search results from cards already saved
      setNewsCards(newsResult.filter((card) => !links.includes(card.link)));
      if (newsResult.length === 0) { setNotFound(true); }
      setIsSearching(false);
    });
  }

  useEffect(() => {
    const savedSearch = localStorage.getItem('savedSearch');
    if (!searchText && savedSearch) {
      setKeywords(savedSearch);
      findNews(savedSearch);
    }
  }, []);

  return (
    <section className="search-form">
      <h2 className="search-form__title">What is going on in the world?</h2>
      <p className="search-form__subtitle">
        Find the latest news on any topic and save them in your personal account.
      </p>
      <form
        className="search"
        onSubmit={(e) => {
          if (searchText !== '') {
            e.preventDefault();
            setKeywords(searchText);
            localStorage.setItem('savedSearch', searchText);
            findNews(searchText);
          } else {
            e.preventDefault();
            setEmptySearchError(true);
          }
        }}
      >
        <input
          type="text"
          className="search__field"
          placeholder={emptySearchError ? `${errorText}` : 'Enter topic'}
          value={searchText}
          onChange={(e) => handleChange(e)}
        />
        <button
          className="search__button"
          type="submit"
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
