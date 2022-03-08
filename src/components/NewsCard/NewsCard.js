/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/control-has-associated-label */

// import { useState } from 'react';

/* eslint-disable react/prop-types */
function NewsCard({
  // key,
  // cardId,
  keyword,
  card,
  date,
  title,
  source,
  description,
  // isCardSaved,
  toggleSaveCard,
  image,
  link,
  handleDelete,
  isSavedNewsOpen,
  isLoggedIn,
  isCardMarked,
  // setIsCardMarked,
  // userId,
}) {
  // const [isCardMarked, setIsCardMarked] = useState(false);
  const isMarked = () => (isCardMarked ? 'newscard__save-button_marked' : '');

  const cardKeyword = (word) => {
    if (word) {
      return <p className="newscard__tag">{ word }</p>;
    } return null;
  };

  //  choose save/delete button tip text based on which page is open
  //  and if user logged in
  const toolTipTex = () => {
    if (isSavedNewsOpen) {
      return 'Remove from saved';
    }
    if (isLoggedIn) {
      return 'Add to saved';
    }
    return 'Sign In to save articles';
  };
  // console.log(cardId);

  return (

    <div>
      <article className="newscard">
        <a href={link} target="_blank" rel="noreferrer">
          <div
            className="newscard__image"
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: 'center',
              backgroundSize: 'content',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </a>
        {isSavedNewsOpen && cardKeyword(keyword)}
        <div className="newscard__button-container">
          <p className="newscard__add-remove-tip">
            {toolTipTex()}
          </p>
          <button
            type="button"
            // disabled={!isLoggedIn}
            className={
                isSavedNewsOpen
                  ? 'newscard__remove-button'
                  : `newscard__save-button ${isMarked()}`
              }
            onClick={() => {
              if (isSavedNewsOpen) {
                handleDelete(card);
              } else if (isLoggedIn) {
                // setIsCardMarked(true);
                toggleSaveCard(card);
              }
            }}
          />
        </div>
        <a href={link} target="_blank" rel="noreferrer">
          <div className="newscard__content">
            <p className="newscard__date">{ date }</p>
            <h2 className="newscard__title">{ title }</h2>
            <p className="newscard__text">
              { description }
            </p>
            <p className="newscard__source">{ source }</p>
          </div>
        </a>
      </article>
    </div>

  );
}

export default NewsCard;
