/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
function SuccessPopup({ toggleSuccessPopup, toggleSignInPopup, toggleRegistered }) {
  return (
    <>
      <h2 className="popup__title">Registration successfully completed!</h2>
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
    </>
  );
}

export default SuccessPopup;
