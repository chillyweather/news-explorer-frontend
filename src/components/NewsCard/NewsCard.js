/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { useState } from 'react';

/* eslint-disable react/prop-types */
function NewsCard({
  // key,
  // _id,
  date,
  title,
  source,
  description,
  isCardSaved,
  toggleSaveCard,
  isSavedNewsOpen,
  image,
  link,
}) {
  const [isCardMarked, setIsCardMarked] = useState(false);
  const isMarked = () => (isCardMarked ? 'newscard__save-button_marked' : '');
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <article className="newscard">
        <div
          className="newscard__image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <p className="newscard__tag">Nature</p>
        <div className="newscard__button-container">
          <p className="newscard__add-remove-tip">
            {isCardSaved ? 'Remove from saved' : 'Sign In to save articles'}
          </p>
          <button
            type="button"
            className={
              isSavedNewsOpen
                ? 'newscard__remove-button'
                : `newscard__save-button ${isMarked()}`
            }
            onClick={() => {
              setIsCardMarked(!isCardMarked);
              toggleSaveCard();
            }}
          />
        </div>
        <div className="newscard__content">
          <p className="newscard__date">{ date }</p>
          <h2 className="newscard__title">{ title }</h2>
          <p className="newscard__text">
            { description }
          </p>
          <p className="newscard__source">{ source }</p>
        </div>
      </article>
    </a>
  );
}

export default NewsCard;
