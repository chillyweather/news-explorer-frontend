import NewsCard from '../NewsCard/NewsCard';

function NewsCardList() {
  return (
    <div className="cardList">
      <section className="cardList__container">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </section>
      <button className="cardList__button" type="button">
        Show more
      </button>
    </div>
  );
}

export default NewsCardList;
