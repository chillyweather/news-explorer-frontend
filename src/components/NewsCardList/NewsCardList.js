/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList({
  isCardSaved,
  toggleSaveCard,
  isSavedNewsOpen,
  newsCards,
  downloadInitial,
  setNewsCards,
}) {
  console.log(newsCards);

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
      res.forEach((card) => initialCards.push(card));
      setNewsCards(initialCards);
    });
  };

  const renderCards = (cards) => {
    if (cards.length === 0) {
      getInitialCards();
      return cards.map((card, key = card.url) => (
        <NewsCard
          key={key}
          _id={card._id || Math.random()}
          date={convertTime(card.publishedAt)}
          title={card.title}
          description={card.description}
          source={card.source.name}
          isCardSaved={isCardSaved}
          isSavedNewsOpen={isSavedNewsOpen}
          toggleSaveCard={toggleSaveCard}
          image={card.urlToImage}
          link={card.url}
        />
      ));
    }
    return cards.map((card, key = card.url) => (
      <NewsCard
        key={key}
        _id={card._id || Math.random()}
        date={convertTime(card.publishedAt)}
        title={card.title}
        description={card.description}
        source={card.source.name}
        isCardSaved={isCardSaved}
        isSavedNewsOpen={isSavedNewsOpen}
        toggleSaveCard={toggleSaveCard}
        image={card.urlToImage}
        link={card.url}
      />
    ));
  };

  return (
    <div className="cardList">
      <section className="cardList__container">
        {renderCards(newsCards)}
      </section>
      <button className="cardList__button" type="button">
        Show more
      </button>
    </div>
  );
}

export default NewsCardList;
