/* eslint-disable jsx-a11y/control-has-associated-label */
function Footer() {
  return (
    <div className="footer">
      <p className="copyright">© 2022 Dmitri Dmitriev</p>
      <div className="footer__nav-container">
        <ul className="footer__navigation">
          <li className="footer__navigation-item">
            <button type="button" className="footer__nav-text">
              Home
            </button>
          </li>
          <li className="footer__navigation-item">
            <button type="button" className="footer__nav-text">
              Practicum by Yandex
            </button>
          </li>
        </ul>
        <ul className="footer__navigation-icons">
          <li className="footer__navigation-item">
            <button type="button" className="footer__nav-logo-git" />
          </li>
          <li className="footer__navigation-item">
            <button type="button" className="footer__nav-logo-fb" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
