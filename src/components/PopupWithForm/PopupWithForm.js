/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/control-has-associated-label */
function PopupWithForm({
  isOpen,
  isRegistered, name, onSubmit,
}) {
  return (
    isRegistered
      ? (
        <div className={isOpen ? 'modal modal-active' : 'modal'}>
          <div className="background" />
          <div className="popup">
            <button type="button" className="popup__close-button" />
            <h2 className="popup__title">Sign In</h2>
            <form className="popup__content" name={`${name}`} action="#" onSubmit={onSubmit}>

              <button type="submit" className="popup__submit-button">
                Sign In
              </button>
            </form>
          </div>
        </div>
      )
      : (
        <div className={isOpen ? 'modal modal-active' : 'modal'}>
          <div className="background" />
          <div className="popup">
            <button type="button" className="popup__close-button" />
            <h2 className="popup__title">Sign Up</h2>
            <form className="popup__content" name={`${name}`} action="#" onSubmit={onSubmit}>

              <button type="submit" className="popup__submit-button">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )
  );
}

export default PopupWithForm;
