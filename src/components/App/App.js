/* eslint-disable prettier/prettier */
import './App.css';
import { useState } from 'react/cjs/react.development';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import SignInPopup from '../SignInPopup/SignInPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import FailurePopup from '../../FailurePopup/FailurePopup';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNews from '../SavedNews/SavedNews';

import useKeypress from '../../utils/useKeypress';

function App() {
  // popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // mobile popup
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false);

  const toggleMobilePopupState = () => {
    setIsMobilePopupOpen(!isMobilePopupOpen);
  };

  // choose popup content
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isFailurePopupOpen, setIsFailurePopupOpen] = useState(false);

  //  registration success
  const [isRegistered, setIsRegistered] = useState(false);

  //  cards state
  const [isCardSaved, setIsCardSaved] = useState(false);

  //  cards section state
  const [isSavedNewsOpen, setIsSavedNewsOpen] = useState(false);

  // preloader state
  const [isSearching, setIsSearching] = useState(false);

  const closeAllPopups = () => {
    setIsPopupOpen(false);
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailurePopupOpen(false);
  };

  // escape key handling
  useKeypress('Escape', closeAllPopups);

  const toggleSignUpPopup = () => {
    setIsPopupOpen(true);
    setIsSignUpPopupOpen(true);
  };

  const toggleSignInPopup = () => {
    setIsPopupOpen(true);
    setIsSignInPopupOpen(true);
  };

  const toggleSaveCard = () => {
    setIsCardSaved(!isCardSaved);
  };

  return (
    <div className="page">

      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Header
                isRegistered={isRegistered}
                toggleSignUpPopup={toggleSignUpPopup}
                toggleSignInPopup={toggleSignInPopup}
                isSavedNewsOpen={false}
                isMobilePopupOpen={isMobilePopupOpen}
                toggleMobilePopup={toggleMobilePopupState}
                toggleSavedNewsOpen={setIsSavedNewsOpen}
              />
              <Main
                isCardSaved={isCardSaved}
                toggleSaveCard={toggleSaveCard}
                isSavedNewsOpen={isSavedNewsOpen}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
              />
            </>
)}
        />
        <Route
          path="/saved-news"
          element={(
            <>
              <Header
                isRegistered={isRegistered}
                toggleSignUpPopup={toggleSignUpPopup}
                toggleSignInPopup={toggleSignInPopup}
                toggleSavedNewsOpen={setIsSavedNewsOpen}
                isSavedNewsOpen
              />
              <SavedNewsHeader />
              <SavedNews
                isCardSaved={isCardSaved}
                toggleSaveCard={toggleSaveCard}
                isSavedNewsOpen={isSavedNewsOpen}
              />
            </>

          )}
        />
      </Routes>

      <Footer />
      <PopupWithForm
        closePopups={closeAllPopups}
        isOpen={isPopupOpen}
        isRegistered={isRegistered}
        toggleRegistered={setIsRegistered}
        isMobilePopupOpen={isMobilePopupOpen}
      >
        {isSignUpPopupOpen && (
          <SignUpPopup
            closeSignUpPopup={setIsSignUpPopupOpen}
            toggleSignInPopup={toggleSignInPopup}
            toggleSuccessPopup={setIsSuccessPopupOpen}
          />
        )}
        {isSignInPopupOpen && (
          <SignInPopup
            toggleSignUpPopup={toggleSignUpPopup}
            closeSignInPopup={setIsSignInPopupOpen}
            toggleFailurePopup={setIsFailurePopupOpen}
          />
        )}
        {isSuccessPopupOpen && (
          <SuccessPopup
            toggleRegistered={setIsRegistered}
            closePopups={closeAllPopups}
            toggleSignInPopup={toggleSignInPopup}
            toggleSuccessPopup={setIsSuccessPopupOpen}
          />
        )}
        {isFailurePopupOpen && (<FailurePopup />)}
      </PopupWithForm>
    </div>
  );
}

export default App;
