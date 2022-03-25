function SortMenu() {
  return (
    <div className="sortMenu__container">
      <div className="sortMenu__content">
        <p className="sortMenu__title"> Sort by...</p>
        <ul className="sortMenu__list">
          <li className="sortMenu__list-item">Date ↓</li>
          <li className="sortMenu__list-item">Date ↑</li>
          <li className="sortMenu__list-item">Keyword (A-Z)</li>
          <li className="sortMenu__list-item">Keyword (Z-A)</li>
        </ul>
      </div>
    </div>
  );
}

export default SortMenu;
