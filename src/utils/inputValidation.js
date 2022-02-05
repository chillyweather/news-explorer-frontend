/* eslint-disable prettier/prettier */
import validator from 'validator';

function checkEmail(mail) {
  if (!mail) {
    return <span className="input-error input-error-active">Email required</span>;
  }
  if (!validator.isEmail(mail)) {
    return <span className="input-error input-error-active">Invalid email</span>;
  }
  return null;
}

function checkPassword(pass) {
  if (!pass) {
    return <span className="input-error input-error-active">Password required</span>;
  }
  if (
    !validator.isStrongPassword(pass, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
  ) {
    return (
      <span className="input-error input-error-active">
        At least 8 characters, capital letter, number and a symbol
      </span>
    );
  }
  return null;
}

function checkUsername(name) {
  if (!name) {
    return <span className="input-error input-error-active input-error-username">Username required</span>;
  }
  if (name.length < 3) {
    return (
      <span className="input-error input-error-active input-error-username">Username must be at least 3 characters</span>
    );
  }
  return <span className="input-error" />;
}

export { checkEmail, checkPassword, checkUsername };
