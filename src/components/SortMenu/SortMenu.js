/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';

function SortMenu({
  setIsSortMenuOpen,
  // sortingOrder,
  setSortingOrder,
}) {
  const ref = useRef(null);

  const detectOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsSortMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', detectOutsideClick);
    return () => document.removeEventListener('click', detectOutsideClick);
  });

  return (
    <div className="sortMenu__container" ref={ref}>
      <div className="sortMenu__content">
        <p className="sortMenu__title"> Sort by...</p>
        <ul className="sortMenu__list">
          <li
            className="sortMenu__list-item"
            onClick={() => {
              setSortingOrder('Latest');
              setIsSortMenuOpen(false);
            }}
          >
            Latest
          </li>
          <li
            className="sortMenu__list-item"
            onClick={() => {
              setSortingOrder('Oldest');
              setIsSortMenuOpen(false);
            }}
          >
            Oldest
          </li>
          <li
            className="sortMenu__list-item"
            onClick={() => {
              setSortingOrder('Keyword (A-Z)');
              setIsSortMenuOpen(false);
            }}
          >
            Keyword (A-Z)
          </li>
          <li
            className="sortMenu__list-item"
            onClick={() => {
              setSortingOrder('Keyword (Z-A)');
              setIsSortMenuOpen(false);
            }}
          >
            Keyword (Z-A)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortMenu;
