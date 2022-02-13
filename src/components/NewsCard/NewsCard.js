/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
function NewsCard({ isCardSaved }) {
  return (
    <article className="newscard">
      <div className="newscard__image" />
      <p className="newscard__tag">Nature</p>
      <div className="newscard__button-container">
        <p className="newscard__add-remove-tip">
          {isCardSaved ? 'Remove from saved' : 'Sign In to save articles'}
        </p>
        <button
          type="button"
          className={isCardSaved ? 'newscard__remove-button' : 'newscard__save-button'}
        />
      </div>
      <div className="newscard__content">
        <p className="newscard__date">February 19, 2019</p>
        <h2 className="newscard__title">Nature makes you better</h2>
        <p className="newscard__text">
          We all know how good nature can make us feel. We have known it for millennia: the sound of
          the ocean, the scents of a forest, the way dappled sunlight dances through leaves.
        </p>

        <p className="newscard__source">national geographic</p>
      </div>
    </article>
  );
}

export default NewsCard;
