/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';
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
  // userId,
}) {
  const [newsCards, setNewsCards] = useState([]);
  return (
    <main className="Main">
      <SearchForm
        setIsSearching={setIsSearching}
        handleSearch={handleSearch}
        newsCards={newsCards}
        setNewsCards={setNewsCards}
        setKeywords={setKeywords}
        keywords={keywords}
      />
      {isSearching
        ? (
          <>
            <Preloader />
            <NotFound />
          </>
        )
        : (
          <NewsCardList
            newsCards={newsCards}
            setNewsCards={setNewsCards}
            isCardSaved={isCardSaved}
            toggleSaveCard={toggleSaveCard}
            isSavedNewsOpen={isSavedNewsOpen}
            downloadInitial={downloadInitial}
            isLoggedIn={isLoggedIn}
            keywords={keywords}
            // userId={userId}

          />
        )}
      <About />
    </main>
  );
}

export default Main;
