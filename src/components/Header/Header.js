/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prettier/prettier */
import { useState } from 'react';

function Header({ togglePopup }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // const [isLightTheme, setIsLightTheme] = useState(false);

  const toggleMobileNavMenu = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className={isMobileNavOpen ? 'header header_open' : 'header'}>
      <div className="header__mobile-container">
        <p className="header__logo">NewsExplorer</p>
        <button
          type="button"
          className={isMobileNavOpen ? 'header__menu header__menu_open' : 'header__menu'}
          onClick={toggleMobileNavMenu}
        />
      </div>
      <div className={`header__navigation ${isMobileNavOpen && 'header__navigation_open'}`}>
        <button type="button" className="header__button header__nav-button header__home-button">
          Home
        </button>
        <button
          type="button"
          className="header__button header__nav-button header__nav-button_active header__nav-button header__articles-button header_dark"
        >
          Saved Articles
        </button>
        <button
          type="submit"
          className="header__button header__login-button"
          onClick={togglePopup}
        >
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
