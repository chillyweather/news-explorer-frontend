function SavedNewsHeader() {
  return (
    <div className="saved-header">
      <p className="saved-header__section-name">Saved articles</p>
      <h2 className="saved-header__title">Elise, you have 5 saved articles</h2>
      <p className="saved-header__tag-line">
        By keywords:
        <span className="saved-header__tag"> Nature, Yellowstone, and 2 other</span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
