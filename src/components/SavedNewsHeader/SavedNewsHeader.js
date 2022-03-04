// import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/currentUserContext';
/* eslint-disable react/prop-types */
function SavedNewsHeader({ savedKeywords }) {
  const currentUser = useContext(CurrentUserContext);
  const titleHandler = (arr, username) => `${username}, you have ${arr.length} saved articles`;

  const keywordLine = (arr) => {
    if (arr.length > 3) {
      return ` ${arr[0]}, ${arr[1]} and ${arr.length - 2} other`;
    }
    if (arr.length === 3) {
      return ` ${arr[0]}, ${arr[1]} and 1 other`;
    }
    if (arr.length === 2) {
      return ` ${arr[0]}, ${arr[1]}`;
    }
    if (arr.length === 1) {
      return ` ${arr[0]}`;
    }
    return null;
  };

  return (
    <div className="saved-header">
      <p className="saved-header__section-name">Saved articles</p>
      <h2 className="saved-header__title">{titleHandler(savedKeywords, currentUser)}</h2>
      <p className="saved-header__tag-line">
        By keywords:
        <span className="saved-header__tag">{keywordLine(savedKeywords)}</span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
