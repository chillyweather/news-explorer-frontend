/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
function FailurePopup({
  isRegistered, failurePopupText, isSavedNewsOpen, resetLogin, resetRegistration,
}) {
  return (
    <>
      <h2 className="popup__title">{failurePopupText}</h2>
      {!isSavedNewsOpen && (
        <button
          className="popup__choose-form-button popup__confirm-prompt"
          type="button"
          onClick={() => (isRegistered ? resetLogin() : resetRegistration())}
        >
          Try again
        </button>
      )}
    </>
  );
}

export default FailurePopup;
