/* eslint-disable react/prop-types */
import NewsCard from '../NewsCard/NewsCard';

function SavedNews({ isCardSaved, toggleSaveCard, isSavedNewsOpen }) {
  return (
    <div className="saved-news">
      <div className="saved-news__container">
        <NewsCard
          isCardSaved={isCardSaved}
          toggleSaveCard={toggleSaveCard}
          isSavedNewsOpen={isSavedNewsOpen}
        />
        <NewsCard
          isCardSaved={isCardSaved}
          toggleSaveCard={toggleSaveCard}
          isSavedNewsOpen={isSavedNewsOpen}
        />
        <NewsCard
          isCardSaved={isCardSaved}
          toggleSaveCard={toggleSaveCard}
          isSavedNewsOpen={isSavedNewsOpen}
        />
        <NewsCard
          isCardSaved={isCardSaved}
          toggleSaveCard={toggleSaveCard}
          isSavedNewsOpen={isSavedNewsOpen}
        />
      </div>
    </div>
  );
}

export default SavedNews;
