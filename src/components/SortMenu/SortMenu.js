/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';

function SortMenu({
  setIsSortMenuOpen,
  sortingOrder,
  setSortingOrder,
}) {
  const ref = useRef(null);

  const detectOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsSortMenuOpen(false);
    }
  };

  const setCheckMark = (sortBy) => ((sortingOrder === sortBy) ? 'checkmark checkmark_visible' : 'checkmark');

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
              setSortingOrder('Last Added');
              setIsSortMenuOpen(false);
            }}
          >
            <p className={setCheckMark('Last Added')}>✓ </p>
            Date added (Latest first)
          </li>
          <li
            className="sortMenu__list-item"
            onClick={() => {
              setSortingOrder('First Added');
              setIsSortMenuOpen(false);
            }}
          >
            <p className={setCheckMark('First Added')}>✓ </p>
            Date added (Oldest first)
          </li>
          <li
            className="sortMenu__list-item"
            onClick={() => {
              setSortingOrder('Latest');
              setIsSortMenuOpen(false);
            }}
          >
            <p className={setCheckMark('Latest')}>✓ </p>
            Date published (Latest first)
          </li>
          <li
            className="sortMenu__list-item"
            onClick={() => {
              setSortingOrder('Oldest');
              setIsSortMenuOpen(false);
            }}
          >
            <p className={setCheckMark('Oldest')}>✓ </p>
            Date published (Oldest first)
          </li>
          <li
            className="sortMenu__list-item"
            onClick={() => {
              setSortingOrder('Keyword (A-Z)');
              setIsSortMenuOpen(false);
            }}
          >
            <p className={setCheckMark('Keyword (A-Z)')}>✓ </p>
            Keyword (A-Z)
          </li>
          <li
            className="sortMenu__list-item"
            onClick={() => {
              setSortingOrder('Keyword (Z-A)');
              setIsSortMenuOpen(false);
            }}
          >
            <p className={setCheckMark('Keyword (Z-A)')}>✓ </p>
            Keyword (Z-A)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortMenu;
