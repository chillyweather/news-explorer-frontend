import About from '../About/About';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main() {
  return (
    <div className="Main">
      <SearchForm />
      <NewsCardList />
      <About />
    </div>
  );
}

export default Main;
