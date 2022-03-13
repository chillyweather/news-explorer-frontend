/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import {
  useEffect, useContext,
} from 'react';
import NewsCard from '../NewsCard/NewsCard';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/currentUserContext';

function SavedNews({
  isCardSaved,
  toggleSaveCard,
  isSavedNewsOpen,
  convertTime,
  setSavedKeywords,
  handleDelete,
  setIsSavedNewsOpen,
  savedArticles,
  setSavedArticles,
  capitalizeFirstLetter,
}) {
  const currentUser = useContext(CurrentUserContext);

  const renderArticles = (cards) => {
    if (cards) {
      return cards.map((card, key = card.url) => (
        <NewsCard
          key={key}
          keyword={card.keyword}
          card={card}
          cardId={card._id || Math.random()}
          date={convertTime(card.date)}
          title={card.title}
          description={card.text}
          source={card.source}
          isCardSaved={isCardSaved}
          isSavedNewsOpen={isSavedNewsOpen}
          toggleSaveCard={toggleSaveCard}
          image={card.image}
          link={card.link}
          handleDelete={handleDelete}
        />
      ));
    } return null;
  };

  useEffect(() => {
    setIsSavedNewsOpen(true);

    const articles = [];
    const keywords = [];

    mainApi.getArticles()
      .then((cards) => {
        cards.forEach((card) => {
          if (currentUser._id === card.owner) {
            articles.push(card);
            keywords.push(capitalizeFirstLetter(card.keyword));
          } return null;
        });
        setSavedArticles(articles.reverse());
        renderArticles(savedArticles);
      }).finally(() => {
        setSavedKeywords([...new Set(keywords)]);
      });
  }, []);

  return (
    <div className="saved-news">
      <div className="saved-news__container">
        {renderArticles(savedArticles)}
      </div>
    </div>
  );
}

export default SavedNews;
