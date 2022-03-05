/* eslint-disable prettier/prettier */
// import { useState } from 'react';
import { checkEmail } from '../../utils/inputValidation';

/* eslint-disable react/prop-types */
function SignInPopup(
  {
    email,
    setEmail,
    password,
    setPassword,
  },
) {
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
      </label>

    </>
  );
}

export default SignInPopup;
