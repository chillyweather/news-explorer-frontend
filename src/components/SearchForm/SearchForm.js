function SearchForm() {
  return (
    <section className="search-form">
      <h2 className="search-form__title">What is going on in the world?</h2>
      <p className="search-form__subtitle">
        Find the latest news on any topic and save them in your personal account.
      </p>
      <form className="search">
        <input type="text" className="search__field" placeholder="Enter topic" />
        <button className="search__button" type="submit">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
