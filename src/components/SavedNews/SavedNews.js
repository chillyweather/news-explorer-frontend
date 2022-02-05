/* eslint-disable react/prop-types */
import NewsCard from '../NewsCard/NewsCard';

function SavedNews({ isCardSaved }) {
  return (
    <div className="saved-news">
      <div className="saved-news__container">
        <NewsCard isCardSaved={isCardSaved} />
        <NewsCard isCardSaved={isCardSaved} />
        <NewsCard isCardSaved={isCardSaved} />
        <NewsCard isCardSaved={isCardSaved} />
        <NewsCard isCardSaved={isCardSaved} />
      </div>
    </div>
  );
}

export default SavedNews;
