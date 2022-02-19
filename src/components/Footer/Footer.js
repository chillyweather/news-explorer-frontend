/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <p className="copyright">© 2022 Dmitri Dmitriev</p>
      <div className="footer__nav-container">
        <ul className="footer__navigation">
          <Link to="/">
            <li className="footer__navigation-item">
              <button type="button" className="footer__nav-text">
                Home
              </button>
            </li>
          </Link>
          <a href="https://practicum.yandex.com/" target="_blank" rel="noreferrer">
            <li className="footer__navigation-item">
              <button type="button" className="footer__nav-text">
                Practicum by Yandex
              </button>
            </li>
          </a>
        </ul>
        <ul className="footer__navigation-icons">
          <a href="https://github.com/chillyweather" target="_blank" rel="noreferrer">
            <li className="footer__navigation-item">
              <button type="button" className="footer__nav-logo-git" />
            </li>
          </a>
          <a href="https://www.facebook.com/dmitri.dmitriev" target="_blank" rel="noreferrer">
            <li className="footer__navigation-item">
              <button type="button" className="footer__nav-logo-fb" />
            </li>
          </a>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
