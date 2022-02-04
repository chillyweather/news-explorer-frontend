/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
function PopupWithForm({ isOpen, closePopups, children }) {
  // const title = 'Registration successfully completed!';
  return (
    <div className={isOpen ? 'modal modal-active' : 'modal'}>
      <div className="background" />
      <div className="popup">
        <button
          type="button"
          onClick={closePopups}
          className="popup__close-button"
        />
        {children}
        {/* <h2 className="popup__title">{title}</h2>
        <button className="popup__choose-form-button" type="button">
          Sign In
        </button> */}
      </div>
    </div>
  );
}

export default PopupWithForm;
