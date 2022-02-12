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
  isMobilePopupOpen,
  toggleMobilePopup,
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNavMenu = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const headerShadow = () => (isSavedNewsOpen ? ' header_dark' : '');

  //  mobile dropout menu modifications
  const darkMenu = () => (isSavedNewsOpen ? ' header__menu_dark' : '');
  const mobileWhiteMenuText = () => (isMobileNavOpen ? 'header__mobile-nav-menu-text' : '');
  const mobileWhiteMenuButtonBorder = () => (isMobileNavOpen ? 'header__mobile-nav-menu-button-border' : '');

  return (
    <header className={
      isMobileNavOpen
        ? `header header_open${headerShadow()}`
        : `header${headerShadow()}`
}
    >
      {/* logo */}
      {!isMobilePopupOpen && (
      <div className="header__mobile-container">
        <Link to="/">
          <p className={
          isSavedNewsOpen
            ? `header__logo header__logo_dark ${mobileWhiteMenuText()}`
            : 'header__logo'
}
          >
            NewsExplorer
          </p>
        </Link>
        {/* hamburger menu */}
        <button
          type="button"
          className={isMobileNavOpen
            ? 'header__menu header__menu_dark header__menu_open'
            : `header__menu ${darkMenu()}`}
          onClick={toggleMobileNavMenu}
        />
      </div>
      )}
      <div className={`header__navigation ${isMobileNavOpen && 'header__navigation_open'} `}>
        <Link to="/">
          <button
            type="button"
            onClick={() => { setIsMobileNavOpen(false); }}
            className={
          isSavedNewsOpen
            ? `header__button header__nav-button header__button_dark ${mobileWhiteMenuText()}`
            : 'header__button header__nav-button header__nav-button_active'
}
          >

            Home
          </button>
        </Link>
        <Link to="/saved-news">
          <button
            type="button"
            onClick={() => { setIsMobileNavOpen(false); }}
            className={
          isSavedNewsOpen
            ? `header__button header__nav-button header__nav-button_active header__nav-button  header__button_dark header__nav-button_active_dark ${mobileWhiteMenuText()}` : 'header__button header__nav-button '
}
          >

            Saved Articles
          </button>
        </Link>

        <button
          type="submit"
          onClick={() => {
            if (isMobileNavOpen) {
              toggleMobilePopup();
            }
            setIsMobileNavOpen(false);
            if (isRegistered) {
              toggleSignInPopup();
            } else { toggleSignUpPopup(); }
          }}
          className={isSavedNewsOpen ? `header__button header__login-button header__login-button_dark ${mobileWhiteMenuText()} ${mobileWhiteMenuButtonBorder()}` : 'header__button header__login-button'}
        >
          {isRegistered ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </header>
  );
}

export default Header;
