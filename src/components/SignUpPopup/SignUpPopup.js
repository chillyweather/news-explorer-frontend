import { useState } from 'react';
import validator from 'validator';

/* eslint-disable react/prop-types */
function SignUpPopup({ name, handleRegister }) {
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

  function checkEmail(mail) {
    if (!mail) {
      return <span className="input-error input-error-active">Email is required</span>;
    }
    if (!validator.isEmail(mail)) {
      return <span className="input-error input-error-active">Invalid email</span>;
    }
    return <span className="input-error" />;
  }

  // eslint-disable-next-line no-shadow
  // function inputsValidation(email, password, username) {
  //   const errors = {};

  //   if (!email) {
  //     errors.email = 'Email is required';
  //   } else if (!validator.isEmail(email)) {
  //     errors.email = 'Invalid email';
  //   }

  //   if (!password) {
  //     errors.password = 'Password is a required';
  //   } else if (!validator.isStrongPassword(password, { minSymbols: 6 })) {
  //     errors.password = 'Password must be at least 6 characters';
  //   }

  //   if (!username) {
  //     errors.username = 'Username is a required';
  //   } else if (username.length < 5) {
  //     errors.username = 'Username must be at least 6 characters';
  //   }

  //   return errors;
  // }

  // inputsValidation();

  return (
    <>
      <h2 className="popup__title">Sign Up</h2>
      <form className="popup__content" name={`${name}`} action="#" onSubmit={handleSubmit}>
        <label className="form__label" htmlFor="register-email">
          Email
          <input
            className="form__input"
            type="email"
            id="register-email"
            placeholder="Enter your email"
            onChange={handleEmailChange}
            required
            value={email}
          />
          {checkEmail(email)}
        </label>
        <label className="form__label" htmlFor="register-password">
          Password
          <input
            className="form__input"
            type="password"
            id="register-password"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            required
            value={password}
          />
          <span className="input-error input-error-active">Invalid Password</span>
        </label>
        <label className="form__label form__label_username" htmlFor="register-username">
          Username
          <input
            className="form__input"
            type="text"
            id="register-username"
            placeholder="Enter your username"
            onChange={handleUsernameChange}
            required
            value={username}
          />
        </label>
        <span className="input-error input-error-active input-error-username">
          This username is not available
        </span>
        <button type="submit" className="form__submit-button">
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
