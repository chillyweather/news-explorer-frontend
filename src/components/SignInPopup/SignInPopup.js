/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { checkEmail } from '../../utils/inputValidation';

/* eslint-disable react/prop-types */
function SignInPopup({
  name,
  handleLogin,
  toggleSignUpPopup,
  closeSignInPopup,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <>
      <h2 className="popup__title">Sign In</h2>
      <form className="popup__content" name={`${name}`} action="#" onSubmit={handleSubmit}>
        <label className="popup-form__label" htmlFor="register-email">
          Email
          <input
            className="popup-form__input"
            type="email"
            id="register-email"
            placeholder="Enter your email"
            onChange={handleEmailChange}
            required
            value={email}
          />
          {checkEmail(email)}
        </label>
        <label className="popup-form__label" htmlFor="register-password">
          Password
          <input
            className="popup-form__input"
            type="password"
            id="register-password"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            required
            value={password}
          />
          {/* {checkPassword(password)} */}
        </label>

        <button type="submit" className="popup-form__submit-button">
          Sign In
        </button>
      </form>
      <p className="popup__choose-form-text">
        or
        <button
          onClick={() => {
            toggleSignUpPopup();
            closeSignInPopup(false);
          }}
          className="popup__choose-form-button"
          type="button"
        >
          Sign Up
        </button>
      </p>
    </>
  );
}

export default SignInPopup;
