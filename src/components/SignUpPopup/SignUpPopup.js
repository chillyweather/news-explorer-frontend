/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { checkEmail, checkPassword, checkUsername } from '../../utils/inputValidation';

/* eslint-disable react/prop-types */
function SignUpPopup({
  name,
  handleRegister,
  // toggleSuccessPopup,
  closePopups,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password, username);
  };

  return (
    <>
      <h2 className="popup__title">Sign Up</h2>
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
          {checkPassword(password)}
        </label>
        <label className="popup-form__label popup-form__label_username" htmlFor="register-username">
          Username
          <input
            className="popup-form__input"
            type="text"
            id="register-username"
            placeholder="Enter your username"
            onChange={handleUsernameChange}
            required
            value={username}
          />
        </label>
        {checkUsername(username)}
        <button
          type="submit"
          className="popup-form__submit-button"
          onClick={() => closePopups()}
        >
          Sign Up
        </button>
      </form>
      <p className="popup__choose-form-text">
        or
        <button className="popup__choose-form-button" type="button">
          Sign In
        </button>
      </p>
    </>
  );
}

export default SignUpPopup;
