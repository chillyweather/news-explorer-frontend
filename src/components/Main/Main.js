import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';

function Main() {
  return (
    <main className="Main">
      <SearchForm />
      <NotFound />
      <NewsCardList />
      <About />
    </main>
  );
}

export default Main;
