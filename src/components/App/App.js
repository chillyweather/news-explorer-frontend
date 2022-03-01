/* eslint-disable prettier/prettier */
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import SignInPopup from '../SignInPopup/SignInPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import FailurePopup from '../FailurePopup/FailurePopup';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNews from '../SavedNews/SavedNews';

import useKeypress from '../../utils/useKeypress';

import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();

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

  // close popups
  const closeAllPopups = () => {
    setIsPopupOpen(false);
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailurePopupOpen(false);
  };

  //  registration state
  const [isRegistered, setIsRegistered] = useState(false);

  //  login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //  header button text state
  const [buttonText, setButtonText] = useState('Sign In');

  //  cards state
  const [isCardSaved, setIsCardSaved] = useState(false);

  //  cards section state
  const [isSavedNewsOpen, setIsSavedNewsOpen] = useState(false);

  // preloader state
  const [isSearching, setIsSearching] = useState(false);

  //  keyword state
  const [keywords, setKeywords] = useState('');

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

  const toggleSaveCard = (article) => {
    if (article) {
      mainApi.saveArticle(article).then((res) => {
        console.log(res);
      });
      setIsCardSaved(!isCardSaved);
    } else {
      throw new Error('No article added');
    }
  };

  //  registration handler
  const registrationHandler = (
    email,
    password,
    username,
  ) => mainApi.register(email, password, username);

  //  login handler
  const loginHandler = (email, password) => {
    mainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          closeAllPopups();
        }
      });
  };

  //  logout handler
  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setButtonText('Sign In');
    navigate('/');
  };

  const handleSearch = (keyword) => newsApi.find(keyword);

  const downloadInitial = () => newsApi.downloadInitial();

  useEffect(() => {
    function handleTokenCheck() {
      const token = localStorage.getItem('token');
      if (token) {
        mainApi.checkToken().then((data) => {
          setIsLoggedIn(true);
          const buttonName = data.data.name.split(' ')[0];
          setButtonText(buttonName);
        });
      }
    }

    handleTokenCheck();
  }, [isLoggedIn, buttonText]);

  return (
    <div className="page">

      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Header
                isRegistered={isRegistered}
                isLoggedIn={isLoggedIn}
                buttonText={buttonText}
                setButtonText={setButtonText}
                toggleSignUpPopup={toggleSignUpPopup}
                toggleSignInPopup={toggleSignInPopup}
                isSavedNewsOpen={false}
                isMobilePopupOpen={isMobilePopupOpen}
                toggleMobilePopup={toggleMobilePopupState}
                toggleSavedNewsOpen={setIsSavedNewsOpen}
                handleLogOut={handleLogOut}
              />
              <Main
                isCardSaved={isCardSaved}
                toggleSaveCard={toggleSaveCard}
                isSavedNewsOpen={isSavedNewsOpen}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
                handleSearch={handleSearch}
                downloadInitial={downloadInitial}
                setKeywords={setKeywords}
                keywords={keywords}
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
                isLoggedIn={isLoggedIn}
                buttonText={buttonText}
                setButtonText={setButtonText}
                toggleSignUpPopup={toggleSignUpPopup}
                toggleSignInPopup={toggleSignInPopup}
                toggleSavedNewsOpen={setIsSavedNewsOpen}
                isSavedNewsOpen
                handleLogOut={handleLogOut}
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
            registrationHandler={registrationHandler}
          />
        )}
        {isSignInPopupOpen && (
          <SignInPopup
            toggleSignUpPopup={toggleSignUpPopup}
            closeSignInPopup={setIsSignInPopupOpen}
            toggleFailurePopup={setIsFailurePopupOpen}
            loginHandler={loginHandler}
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
