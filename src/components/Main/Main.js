/* eslint-disable react/prop-types */
import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';

function Main({ isCardSaved, toggleSaveCard, isSavedNewsOpen }) {
  return (
    <main className="Main">
      <SearchForm />
      <NotFound />
      <NewsCardList
        isCardSaved={isCardSaved}
        toggleSaveCard={toggleSaveCard}
        isSavedNewsOpen={isSavedNewsOpen}
      />
      <About />
    </main>
  );
}

export default Main;
