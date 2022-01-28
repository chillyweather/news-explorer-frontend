import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';

function Main() {
  return (
    <div className="Main">
      <SearchForm />
      <NotFound />
      <NewsCardList />
      <About />
    </div>
  );
}

export default Main;
