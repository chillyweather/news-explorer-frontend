/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

function PopupWithForm({
  isOpen, closePopups, children,
}) {
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
        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;
