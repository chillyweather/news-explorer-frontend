/* eslint-disable react/prop-types */
function FailurePopup({ failurePopupText, isSavedNewsOpen }) {
  return (
    <>
      <h2 className="popup__title">{failurePopupText}</h2>
      {!isSavedNewsOpen && (
        <button className="popup__choose-form-button popup__confirm-prompt" type="button">
          Try again
        </button>
      )}
    </>
  );
}

export default FailurePopup;
