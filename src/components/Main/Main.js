/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

function Main({
  isSearching, setIsSearching, isCardSaved, toggleSaveCard, isSavedNewsOpen,
}) {
  return (
    <main className="Main">
      <SearchForm setIsSearching={setIsSearching} />
      {isSearching
        ? (
          <>
            <Preloader />
            <NotFound />
          </>
        )
        : (
          <NewsCardList
            isCardSaved={isCardSaved}
            toggleSaveCard={toggleSaveCard}
            isSavedNewsOpen={isSavedNewsOpen}
          />
        )}
      <About />
    </main>
  );
}

export default Main;
