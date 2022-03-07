/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
// import { useState } from 'react';
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
// import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

function Main({
  isSearching,
  setIsSearching,
  setKeywords,
  keywords,
  isCardSaved,
  toggleSaveCard,
  isSavedNewsOpen,
  handleSearch,
  downloadInitial,
  isLoggedIn,
  setNotFound,
  searchText,
  setSearchText,
  newsCards,
  setNewsCards,
  renderCards,
  // userId,
}) {
  const savedSearch = localStorage.getItem('savedSearch');
  const renderNewsCards = () => {
    if (!savedSearch) {
      return null;
    }
    // if (savedSearch && newsCards.length === 0) {
    //   return <NotFound />;
    // }
    return (
      <NewsCardList
        newsCards={newsCards}
        setNewsCards={setNewsCards}
        isCardSaved={isCardSaved}
        toggleSaveCard={toggleSaveCard}
        isSavedNewsOpen={isSavedNewsOpen}
        downloadInitial={downloadInitial}
        isLoggedIn={isLoggedIn}
        keywords={keywords}
        renderCards={renderCards}
      />
    );
  };
  return (
    <main className="Main">
      <SearchForm
        setIsSearching={setIsSearching}
        handleSearch={handleSearch}
        newsCards={newsCards}
        setNewsCards={setNewsCards}
        setKeywords={setKeywords}
        keywords={keywords}
        setNotFound={setNotFound}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {isSearching
        ? (
          <>
            <Preloader />
            {/* <NotFound /> */}
          </>
        )
        : renderNewsCards()}
      <About />
    </main>
  );
}

export default Main;
