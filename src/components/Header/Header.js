/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({
  toggleSignUpPopup,
  toggleSignInPopup,
  isRegistered,
  isSavedNewsOpen,
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // const [isLightTheme, setIsLightTheme] = useState(false);

  const toggleMobileNavMenu = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const headerShadow = () => (isSavedNewsOpen ? ' header_dark' : '');

  return (
    <header className={
      isMobileNavOpen
        ? `header header_open${headerShadow()}`
        : `header${headerShadow()}`
}
    >
      <div className="header__mobile-container">
        <Link to="/">
          <p className={
          isSavedNewsOpen
            ? 'header__logo header__logo_dark'
            : 'header__logo'
}
          >
            NewsExplorer
          </p>
        </Link>
        <button
          type="button"
          className={isMobileNavOpen ? 'header__menu header__menu_open' : 'header__menu'}
          onClick={toggleMobileNavMenu}
        />
      </div>
      <div className={`header__navigation ${isMobileNavOpen && 'header__navigation_open'} `}>
        <Link to="/">
          <button
            type="button"
            className={
          isSavedNewsOpen
            ? 'header__button header__nav-button header__home-button header__button_dark '
            : 'header__button header__nav-button header__home-button header__nav-button_active'
}
          >

            Home
          </button>
        </Link>
        <Link to="/saved-news">
          <button
            type="button"
            className={
            isSavedNewsOpen
              ? 'header__button header__nav-button header__nav-button_active header__nav-button header__articles-button header__button_dark header__nav-button_active_dark'
              : 'header__button header__nav-button header__nav-button header__articles-button header_dark'
}
          >
            Saved Articles
          </button>
        </Link>
        <button
          type="submit"
          className={isSavedNewsOpen ? 'header__button header__login-button header__login-button_dark' : 'header__button header__login-button'}
          onClick={isRegistered ? toggleSignInPopup : toggleSignUpPopup}
        >
          {isRegistered ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </header>
  );
}

export default Header;
