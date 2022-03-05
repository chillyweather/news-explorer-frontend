/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

function PopupWithForm({
  // setEmail,
  // setPassword,
  children,
  closePopups,
  closeSignInPopup,
  closeSignUpPopup,
  email,
  failurePopupText,
  isFailurePopupOpen,
  isOpen,
  isRegistered,
  isSignInPopupOpen,
  isSignUpPopupOpen,
  isSuccessPopupOpen,
  loginHandler,
  password,
  registrationHandler,
  resetLogin,
  resetRegistration,
  toggleSignInPopup,
  toggleSignUpPopup,
  toggleRegistered,
  toggleSuccessPopup,
  username,
}) {
  const handleSubmit = () => {
    if (isSignUpPopupOpen) {
      registrationHandler(email, password, username);
    } if (isSignInPopupOpen) { loginHandler(email, password); }
  };

  const popupTitle = () => {
    if (isSignInPopupOpen) {
      return 'Sign In';
    }
    if (isSignUpPopupOpen) {
      return 'Sign Up';
    }
    if (isSuccessPopupOpen) {
      return 'Registration successfully completed!';
    }
    if (isFailurePopupOpen) {
      return `${failurePopupText}`;
    }
    return null;
  };

  const popupRedirect = () => {
    if (isSignInPopupOpen) {
      return 'Sign Up';
    }
    if (isSignUpPopupOpen) {
      return 'Sign In';
    } return null;
  };

  const submitButtonText = () => {
    if (isSignInPopupOpen) {
      return 'Sign In';
    }
    if (isSignUpPopupOpen) {
      return 'Sign Up';
    } return null;
  };

  const showForm = () => {
    if (isSignInPopupOpen || isSignUpPopupOpen) {
      return (
        <>

          <form
            className="popup__content"
          // name={`${name}`}
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {children}
            <button
              type="submit"
              className="popup-form__submit-button"
            >
              {submitButtonText()}
            </button>
          </form>
          <p className="popup__choose-form-text">
            or
            <button
              onClick={() => {
                if (isSignUpPopupOpen) {
                  closeSignUpPopup(false);
                  toggleSignInPopup();
                } else {
                  toggleSignUpPopup();
                  closeSignInPopup(false);
                }
              }}
              className="popup__choose-form-button"
              type="button"
            >
              {popupRedirect()}
            </button>
          </p>

        </>
      );
    } return null;
  };

  const tryConfirmButton = () => {
    if (isFailurePopupOpen) {
      return (
        <button
          className="popup__choose-form-button popup__confirm-prompt"
          type="button"
          onClick={() => (
            isRegistered
              ? resetLogin()
              : resetRegistration())}
        >
          Try again
        </button>
      );
    } if (isSuccessPopupOpen) {
      return (
        <button
          className="popup__choose-form-button popup__confirm-prompt"
          type="button"
          onClick={() => {
            toggleRegistered(true);
            toggleSuccessPopup(false);
            toggleSignInPopup();
          }}
        >
          Sign In
        </button>
      );
    } return null;
  };

  return (
    <div className={isOpen ? 'modal modal-active' : 'modal'}>
      <div className="background" onClick={closePopups} />
      <div className="popup">
        <button
          type="button"
          onClick={() => {
            closePopups();
          }}
          className="popup__close-button"
        />
        <h2 className="popup__title">{popupTitle()}</h2>
        {showForm()}
        {tryConfirmButton()}
      </div>
    </div>
  );
}

export default PopupWithForm;
