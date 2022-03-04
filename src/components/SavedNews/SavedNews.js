/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import {
  useEffect,
} from 'react';
import NewsCard from '../NewsCard/NewsCard';
import mainApi from '../../utils/MainApi';

function SavedNews({
  isCardSaved,
  toggleSaveCard,
  isSavedNewsOpen,
  convertTime,
  setSavedKeywords,
  handleDelete,
  setIsSavedNewsOpen,
  savedArticles,
  // savedKeywords,
  setSavedArticles,
  capitalizeFirstLetter,
  userId,
}) {
  // const keywordList = [];
  // const [savedArticles, setSavedArticles] = useState([]);

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
          userId={userId}

        />
      ));
    } return null;
  };

  useEffect(() => {
    setIsSavedNewsOpen(true);

    const articles = [];
    const keywords = [];

    mainApi.getArticles().then((cards) => {
      cards.forEach((card) => {
        articles.push(card);
        keywords.push(capitalizeFirstLetter(card.keyword));
      });
      setSavedKeywords([...new Set(keywords)]);
      setSavedArticles(articles.reverse());
      console.log(savedArticles);
    });
  }, [isSavedNewsOpen]);

  return (
    <div className="saved-news">
      <div className="saved-news__container">
        {renderArticles(savedArticles)}
      </div>
    </div>
  );
}

export default SavedNews;
