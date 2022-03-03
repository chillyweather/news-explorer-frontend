/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({
  isCardSaved,
  // keywords,
  toggleSaveCard,
  isSavedNewsOpen,
  newsCards,
  downloadInitial,
  setNewsCards,
  isLoggedIn,
}) {
  const [showAll, setShowAll] = useState(false);
  // const [threeCards, setThreeCards] = useState([]);

  const convertTime = (d) => {
    const date = new Date(d);
    const month = date.toLocaleString('default', { month: 'long' });
    const arr = date.toDateString().split(' ');
    return `${month} ${arr[2]}, ${arr[3]}`;
  };

  // get initial 'top news' cards
  const getInitialCards = () => {
    const initialCards = [];
    downloadInitial().then((res) => {
      res.forEach((card) => {
        const newCard = {
          title: card.title,
          text: card.content,
          date: card.publishedAt,
          source: card.source.name,
          link: card.url,
          image: card.urlToImage,
          keyword: 'Hot News',
        };
        initialCards.push(newCard);
      });
      setNewsCards(initialCards);
      // setThreeCards(initialCards.slice(0, 3));
    });
  };

  const renderCards = (cards) => {
    // const searchKeywords = keywords.split(' ');
    if (cards.length === 0) {
      getInitialCards();
      return cards.map((card, key = card.url) => (
        <NewsCard
          key={key}
          keyword={card.keyword}
          card={card}
          _id={card._id || Math.random()}
          date={convertTime(card.date)}
          title={card.title}
          description={card.text}
          source={card.source}
          isCardSaved={isCardSaved}
          isSavedNewsOpen={isSavedNewsOpen}
          toggleSaveCard={toggleSaveCard}
          image={card.image}
          link={card.link}
          isLoggedIn={isLoggedIn}

        />
      ));
    }
    return cards.map((card, key = card.url) => (
      <NewsCard
        key={key}
        keyword={card.keyword}
        card={card}
        _id={card._id || Math.random()}
        date={convertTime(card.date)}
        title={card.title}
        description={card.text}
        source={card.source}
        isCardSaved={isCardSaved}
        isSavedNewsOpen={isSavedNewsOpen}
        toggleSaveCard={toggleSaveCard}
        image={card.image}
        link={card.link}
        isLoggedIn={isLoggedIn}

      />
    ));
  };

  const buttonText = () => (showAll ? 'Show less' : 'Show more');

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

export default NewsCardList;
