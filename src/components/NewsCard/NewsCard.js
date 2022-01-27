function NewsCard() {
  return (
    <article className="newscard">
      <div className="newscard__image" />
      <div className="newscard__tag">
        <p>Nature</p>
      </div>
      <div className="newscard__add-remove-tip">
        <p>Remove saved</p>
      </div>
      <div className="newscard__add-remove-button" />
      <div className="newscard__content">
        <p className="newscard__date">February 19, 2019</p>
        <h2 className="newscard__title">Nature makes you better</h2>
        <div className="newscard__text-container">
          <p className="newscard__text">
            We all know how good nature can make us feel. We have known it for millennia: the sound
            of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.
          </p>
        </div>
        <div className="newscard__source">
          <p>national geographic</p>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
