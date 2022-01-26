function SearchForm() {
  return (
    <section className="search-form__container">
      <h2 className="search-form__title">What is going on in the world?</h2>
      <p className="search-form__subtitle">
        Find the latest news on any topic and save them in your personal account.
      </p>
      <div className="search">
        <input type="text" className="search-field" placeholder="Enter topic" />
        <button className="search-button" type="submit">
          Search
        </button>
      </div>
    </section>
  );
}

export default SearchForm;
