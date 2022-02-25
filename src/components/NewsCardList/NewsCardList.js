/* eslint-disable react/prop-types */
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({ isCardSaved, toggleSaveCard, isSavedNewsOpen }) {
  return (
    <div className="cardList">
      <section className="cardList__container">
        <NewsCard
          isCardSaved={isCardSaved}
          isSavedNewsOpen={isSavedNewsOpen}
          toggleSaveCard={toggleSaveCard}
        />
        <NewsCard
          isCardSaved={isCardSaved}
          isSavedNewsOpen={isSavedNewsOpen}
          toggleSaveCard={toggleSaveCard}
        />
        <NewsCard
          isCardSaved={isCardSaved}
          isSavedNewsOpen={isSavedNewsOpen}
          toggleSaveCard={toggleSaveCard}
        />
        <NewsCard
          isCardSaved={isCardSaved}
          isSavedNewsOpen={isSavedNewsOpen}
          toggleSaveCard={toggleSaveCard}
        />
      </section>
      <button className="cardList__button" type="button">
        Show more
      </button>
    </div>
  );
}

export default NewsCardList;
