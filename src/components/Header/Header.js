/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { CurrentUserContext } from '../../contexts/currentUserContext';

function Header({
  // toggleSignUpPopup,
  toggleSignInPopup,
  // isRegistered,
  isLoggedIn,
  handleLogOut,
  isSavedNewsOpen,
  // isMobilePopupOpen,
  toggleMobilePopup,
  toggleSavedNewsOpen,
  buttonText,
}) {
  // const currentUser = useContext(CurrentUserContext);

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

      <div className={`header__navigation ${isMobileNavOpen && 'header__navigation_open'} `}>
        <nav className="header__navigation-links">
          <Link to="/">
            <button
              type="button"
              onClick={() => {
                toggleSavedNewsOpen(false);
                setIsMobileNavOpen(false);
              }}
              className={
            isSavedNewsOpen
              ? `header__button header__nav-button header__button_dark ${mobileWhiteMenuText()}`
              : 'header__button header__nav-button header__nav-button_active'
          }
            >
              Home
            </button>
          </Link>
          {isLoggedIn && (
          <Link to="/saved-news">
            <button
              type="button"
              onClick={() => {
                toggleSavedNewsOpen(true);
                setIsMobileNavOpen(false);
              }}
              className={
            isSavedNewsOpen
              ? `header__button header__nav-button header__nav-button_active header__nav-button  header__button_dark header__nav-button_active_dark ${mobileWhiteMenuText()}` : 'header__button header__nav-button '
          }
            >
              Saved Articles
            </button>
          </Link>
          )}
        </nav>

        <button
          type="submit"
          onClick={() => {
            if (isMobileNavOpen) {
              toggleMobilePopup();
            }
            setIsMobileNavOpen(false);
            if (isLoggedIn) {
              handleLogOut();
            } else {
              toggleSignInPopup();
            }
          }}
          className={isSavedNewsOpen ? `header__button header__login-button header__login-button_dark ${mobileWhiteMenuText()} ${mobileWhiteMenuButtonBorder()}` : 'header__button header__login-button'}
        >
          {buttonText}
          {isLoggedIn && (
            isSavedNewsOpen
              ? <div className="header__logout-icon header__logout-icon_dark" />
              : <div className="header__logout-icon header__logout-icon_light" />)}
        </button>
      </div>
    </header>
  );
}

export default Header;
