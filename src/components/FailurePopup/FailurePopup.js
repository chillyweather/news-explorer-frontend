/* eslint-disable react/prop-types */
function FailurePopup() {
  return (
    <>
      <h2 className="popup__title">Wrong username or password!</h2>
      <button className="popup__choose-form-button popup__confirm-prompt" type="button">
        Try again
      </button>
    </>
  );
}

export default FailurePopup;
