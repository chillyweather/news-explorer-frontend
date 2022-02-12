/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import { useEffect, useRef } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
function PopupWithForm({
  isOpen, closePopups, children, toggleMobilePopup,
}) {
  const popupRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (!popupRef.current.contains(e.target)) {
        closePopups();
      }
    });
  });

  return (
    <div className={isOpen ? 'modal modal-active' : 'modal'}>
      <div className="background" />
      <div ref={popupRef} className="popup">
        <button
          type="button"
          onClick={() => {
            toggleMobilePopup();
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
