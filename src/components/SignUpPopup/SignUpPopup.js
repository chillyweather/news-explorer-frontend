/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
// import { useState } from 'react';
import { checkEmail, checkPassword, checkUsername } from '../../utils/inputValidation';

function SignUpPopup({
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
}) {
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <>
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
    </>
  );
}

export default SignUpPopup;
