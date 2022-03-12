/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useState } from 'react';
// import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({
  keywords,
  newsCards,
  renderCards,

}) {
  const [showAll, setShowAll] = useState(false);

  const buttonText = () => (showAll ? 'Show less' : 'Show more');

  const toggleSectionVisibility = () => {
    if (keywords) {
      return (
        <div className="cardList">
          <section className="cardList__container">
            {renderCards(showAll ? newsCards : newsCards.slice(0, 3))}
          </section>
          <button
            className="cardList__button"
            type="button"
            onClick={() => setShowAll(!showAll)}
          >
            {buttonText()}
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    toggleSectionVisibility()
  );
}

export default NewsCardList;
