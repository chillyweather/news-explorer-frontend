/* eslint-disable prettier/prettier */
import './App.css';
import { useState } from 'react/cjs/react.development';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
// import Popup from '../Popup/Popup';
import SignUpPopup from '../SignUpPopup/SignUpPopup';

function App() {
  // const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  // const [isResultsPopupOpen, setIsResultsPopupOpen] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const closeAllPopups = () => {
    setIsPopupOpen(false);
    // setIsResultsPopupOpen(false);
    // setIsFormPopupOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="page">
      <Header
        togglePopup={togglePopup}
      />
      <Main />
      <Footer />
      <PopupWithForm
        closePopups={closeAllPopups}
        isOpen={isPopupOpen}
        isRegistered={isRegistered}
        toggleRegistered={setIsRegistered}
      >

        <SignUpPopup />
      </PopupWithForm>
    </div>
  );
}

export default App;
