/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */

//! still some problems...
// fixed most problems, but still something wrong with saving currentUser data
// and 'saved news' throws me away to the homepage after reload page
// please, give me a kick in the right direction...

import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUserContext';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import SignUpPopup from '../SignUpPopup/SignUpPopup';
import SignInPopup from '../SignInPopup/SignInPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import FailurePopup from '../FailurePopup/FailurePopup';
import ProtectedRoute from '../../utils/ProtectedRoute';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNews from '../SavedNews/SavedNews';

import useKeypress from '../../utils/useKeypress';

import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();

  // current user
  const [currentUser, setCurrentUser] = useState({});

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

  //  sign up popup button
  const [popupButtonText, setPopupButtonText] = useState('Sign In');

  //  failure popup text
  const [failurePopupText, setFailurePopupText] = useState('');

  // close popups
  const closeAllPopups = () => {
    setIsPopupOpen(false);
    setIsSignInPopupOpen(false);
    setIsSignUpPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailurePopupOpen(false);
  };

  //  email, name and password state
  //  for login and registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const resetLoginStates = () => {
    setEmail('');
    setPassword('');
    setUsername('');
  };

  //  registration state
  const [isRegistered, setIsRegistered] = useState(false);

  //  login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //  user id state
  // const [userId, setUserId] = useState({});

  //  header button text state
  // const [buttonText, setButtonText] = useState('Sign In');

  //  user name state
  // const [userName, setUserName] = useState('User');

  //  cards state
  const [isCardSaved, setIsCardSaved] = useState(false);

  //  saved articles state
  const [savedArticles, setSavedArticles] = useState([]);

  //  cards section state
  const [isSavedNewsOpen, setIsSavedNewsOpen] = useState(false);

  // preloader state
  const [isSearching, setIsSearching] = useState(false);

  //  keyword state
  const [keywords, setKeywords] = useState('');

  //  saved news keyword state
  const [savedKeywords, setSavedKeywords] = useState([]);

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
      mainApi.saveArticle(article)
        .then((res) => {
          setIsCardSaved(!isCardSaved);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  //  registration handler
  const registrationHandler = (
    mail,
    pass,
    uname,
  ) => {
    setPopupButtonText('Loading...');
    setIsRegistered(false);
    mainApi.register(mail, pass, uname)
      .then((data) => {
        if (data._id) {
          // setUserId({ _id: `${data._id}` });
          setIsSignUpPopupOpen(false);
          setIsSuccessPopupOpen(true);
          setIsRegistered(true);
        }
      })
      .catch((err) => {
        setIsSignUpPopupOpen(false);
        setFailurePopupText('Registration failed');
        setIsFailurePopupOpen(true);
        console.log(err);
      })
      .finally(() => setPopupButtonText('Sign Up'));
  };

  // registration form reset
  const resetRegistration = () => {
    setIsFailurePopupOpen(false);
    setIsSignUpPopupOpen(true);
  };

  // reset login
  const resetLogin = () => {
    setIsFailurePopupOpen(false);
    setIsSignInPopupOpen(true);
  };

  //  set current user

  // const getUser = () => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     mainApi.getUserInfo()
  //       .then((res) => {
  //         console.log(res);
  //         setCurrentUser(res.data);
  //       })
  //       .catch((err) => console.log(err))
  //       .finally(() => {
  //         setIsLoggedIn(true);
  //         closeAllPopups();
  //       });
  //   }
  // };

  //  login handler
  const loginHandler = (mail, pass) => {
    setIsRegistered(true);
    mainApi.login(mail, pass)
      .then((data) => {
        console.log(data);
        setIsLoggedIn(true);
        setCurrentUser(data.data);
      })
      .catch((err) => {
        setIsSignInPopupOpen(false);
        setFailurePopupText('Wrong username or password!');
        setIsFailurePopupOpen(true);
        console.log(err);
      })
      .finally(() => closeAllPopups());
  };

  //  logout handler
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('savedSearch');
    setIsLoggedIn(false);
    setCurrentUser({});
    resetLoginStates();
    // setButtonText('Sign In');
    navigate('/');
  };

  const handleSearch = (keyword) => newsApi.find(keyword);

  //  download initial top news
  const downloadInitial = () => newsApi.downloadInitial();

  //  capitalize first letter
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  //  handle article delete
  const handleDelete = (article) => {
    mainApi.deleteArticle(article)
      .then((res) => {
        console.log(res);
        setSavedArticles((state) => state.filter((c) => c._id !== article._id));
        console.log(savedKeywords);
        // setSavedKeywords(() => refreshKeywords(savedKeywords, article.keyword));
        // console.log(savedKeywords);
      })
      .catch((err) => {
        setFailurePopupText('Only owner can delete this article');
        setIsPopupOpen(true);
        setIsFailurePopupOpen(true);
        console.log(err);
      });
  };

  // get and format time
  const convertTime = (d) => {
    const date = new Date(d);
    const month = date.toLocaleString('default', { month: 'long' });
    const arr = date.toDateString().split(' ');
    return `${month} ${arr[2]}, ${arr[3]}`;
  };

  // useEffect(() => {
  //   function handleTokenCheck() {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       mainApi.checkToken()
  //         .then(() => {
  //           setIsLoggedIn(true);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }

  //   handleTokenCheck();
  // }, []);

  //  set user info after reload
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getUserInfo()
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Routes>
          <Route
            path="/"
            element={(
              <>
                <Header
                  isRegistered={isRegistered}
                  isLoggedIn={isLoggedIn}
                  // buttonText={buttonText}
                  // setButtonText={setButtonText}
                  toggleSignUpPopup={toggleSignUpPopup}
                  toggleSignInPopup={toggleSignInPopup}
                  isSavedNewsOpen={false}
                  isMobilePopupOpen={isMobilePopupOpen}
                  toggleMobilePopup={toggleMobilePopupState}
                  toggleSavedNewsOpen={setIsSavedNewsOpen}
                  handleLogOut={handleLogOut}
                  setPopupButtonText={setPopupButtonText}

                />
                <Main
                  isCardSaved={isCardSaved}
                  toggleSaveCard={toggleSaveCard}
                  isSavedNewsOpen={isSavedNewsOpen}
                  isSearching={isSearching}
                  isLoggedIn={isLoggedIn}
                  setIsSearching={setIsSearching}
                  handleSearch={handleSearch}
                  downloadInitial={downloadInitial}
                  setKeywords={setKeywords}
                  keywords={keywords}
                  // userId={userId}
                />
              </>
)}
          />
          <Route
            path="/saved-news"
            element={(
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
              >
                <>
                  <Header
                    isRegistered={isRegistered}
                    isLoggedIn={isLoggedIn}
                    // buttonText={buttonText}
                    // setButtonText={setButtonText}
                    toggleSignUpPopup={toggleSignUpPopup}
                    toggleSignInPopup={toggleSignInPopup}
                    toggleSavedNewsOpen={setIsSavedNewsOpen}
                    isSavedNewsOpen
                    handleLogOut={handleLogOut}
                  />
                  {isLoggedIn && (
                  <SavedNewsHeader
                    savedKeywords={savedKeywords}
                    savedArticles={savedArticles}
                  />
                  )}
                  {isLoggedIn && (

                  <SavedNews
                    convertTime={convertTime}
                    isCardSaved={isCardSaved}
                    toggleSaveCard={toggleSaveCard}
                    isSavedNewsOpen={isSavedNewsOpen}
                    setIsSavedNewsOpen={setIsSavedNewsOpen}
                    savedKeywords={savedKeywords}
                    setSavedKeywords={setSavedKeywords}
                    handleDelete={handleDelete}
                    // userId={userId}
                    savedArticles={savedArticles}
                    setSavedArticles={setSavedArticles}
                    capitalizeFirstLetter={capitalizeFirstLetter}
                  />
                  )}
                </>
              </ProtectedRoute>
          )}
          />
        </Routes>

        <Footer />
        <PopupWithForm
          closePopups={closeAllPopups}
          closeSignInPopup={setIsSignInPopupOpen}
          closeSignUpPopup={setIsSignUpPopupOpen}
          email={email}
          failurePopupText={failurePopupText}
          isFailurePopupOpen={isFailurePopupOpen}
          isMobilePopupOpen={isMobilePopupOpen}
          isOpen={isPopupOpen}
          isRegistered={isRegistered}
          isSignInPopupOpen={isSignInPopupOpen}
          isSignUpPopupOpen={isSignUpPopupOpen}
          isSuccessPopupOpen={isSuccessPopupOpen}
          loginHandler={loginHandler}
          password={password}
          popupButtonText={popupButtonText}
          registrationHandler={registrationHandler}
          resetLogin={resetLogin}
          resetRegistration={resetRegistration}
          setEmail={setEmail}
          setPassword={setPassword}
          setPopupButtonText={setPopupButtonText}
          setUsername={setUsername}
          toggleRegistered={setIsRegistered}
          toggleSignInPopup={toggleSignInPopup}
          toggleSignUpPopup={toggleSignUpPopup}
          toggleSuccessPopup={setIsSuccessPopupOpen}
          username={username}

        >
          {isSignUpPopupOpen && (
          <SignUpPopup
            toggleSuccessPopup={setIsSuccessPopupOpen}
            signUpPopupButtonText={popupButtonText}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
          />
          )}
          {isSignInPopupOpen && (
            <SignInPopup
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              toggleFailurePopup={setIsFailurePopupOpen}
            />
          )}
          {isSuccessPopupOpen && (
          <SuccessPopup />
          )}
          {isFailurePopupOpen && (
          <FailurePopup />
          )}
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
