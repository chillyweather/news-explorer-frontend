/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
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
  sortingOrder,
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

  const sortList = (array) => {
    if (sortingOrder === 'Oldest') {
      return array.sort((a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date1 - date2;
      });
    }
    if (sortingOrder === 'Latest') {
      return array.sort((a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date2 - date1;
      });
    }
    if (sortingOrder === 'Keyword (A-Z)') {
      return array.sort((a, b) => a.keyword.localeCompare(b.keyword));
    }
    if (sortingOrder === 'Keyword (Z-A)') {
      return array.sort((a, b) => b.keyword.localeCompare(a.keyword));
    }
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
        setSavedArticles(sortList(articles));
        localStorage.setItem('savedArticles', JSON.stringify(articles));
        renderArticles(savedArticles);
      }).finally(() => {
        setSavedKeywords([...new Set(keywords)]);
      });
  }, []);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('savedArticles'));
    setSavedArticles(sortList(cards));
    renderArticles(savedArticles);
  }, [sortingOrder]);

  return (
    <div className="saved-news">
      <div className="saved-news__container">
        {renderArticles(savedArticles)}
      </div>
    </div>
  );
}

export default SavedNews;
