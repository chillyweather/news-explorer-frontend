/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */

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
import NewsCard from '../NewsCard/NewsCard';

import useKeypress from '../../utils/useKeypress';

import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();

  // current user
  const [currentUser, setCurrentUser] = useState({});

  //
  //  ---> popups <---
  //

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

  const toggleSignUpPopup = () => {
    setIsPopupOpen(true);
    setIsSignUpPopupOpen(true);
  };

  const toggleSignInPopup = () => {
    setIsPopupOpen(true);
    setIsSignInPopupOpen(true);
  };

  //
  //  ---> login, registration, etc. <---
  //

  //  email, name and password state
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

  //
  //  ---> component states <---
  //

  // 'not found' section state
  const [notFound, setNotFound] = useState(false);

  //  found articles state
  const [newsCards, setNewsCards] = useState([]);

  //  saved articles state
  const [savedArticles, setSavedArticles] = useState([]);

  //  sort menu state
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  //  sorting order state
  const [sortingOrder, setSortingOrder] = useState('Last Added');

  //  cards section state
  const [isSavedNewsOpen, setIsSavedNewsOpen] = useState(false);

  //  state of search keyword
  const [searchText, setSearchText] = useState('');

  // preloader state
  const [isSearching, setIsSearching] = useState(false);

  //  keyword state
  const [keywords, setKeywords] = useState('');

  //  saved news keyword state
  const [savedKeywords, setSavedKeywords] = useState([]);

  // escape key handling
  useKeypress('Escape', () => {
    closeAllPopups;
    setIsSortMenuOpen(false);
  });

  //  render cards
  const renderCards = (cards) => {
    const convertTime = (d) => {
      const date = new Date(d);
      const month = date.toLocaleString('default', { month: 'long' });
      const arr = date.toDateString().split(' ');
      return `${month} ${arr[2]}, ${arr[3]}`;
    };

    if (cards.length === 0) {
      return null;
    }
    return cards.map((card, key = card.url) => (
      <NewsCard
        key={key}
        keyword={card.keyword}
        card={card}
        _id={card._id || Math.random()}
        date={convertTime(card.date)}
        title={card.title}
        description={card.text}
        source={card.source}
        isSavedNewsOpen={isSavedNewsOpen}
        toggleSaveCard={toggleSaveCard}
        image={card.image}
        link={card.link}
        isLoggedIn={isLoggedIn}
        handleDelete={handleDelete}
        findCardByTitleAndDelete={findCardByTitleAndDelete}
        toggleSignInPopup={toggleSignInPopup}
      />
    ));
  };

  //  render saved keywords

  const handleSavedKeywords = () => {
    const newKeywords = [];
    savedArticles.forEach((article) => {
      newKeywords.push(capitalizeFirstLetter(article.keyword));
    });
    setSavedKeywords([...new Set(newKeywords)]);
  };

  // find card by title (remove just saved cards while being on the main page)
  const findCardByTitleAndDelete = (card) => {
    mainApi.getArticles()
      .then((res) => res.find((c) => c.title === card.title))
      .then((data) => mainApi.deleteArticle(data)
        .then((result) => console.log(result)))
      .catch((err) => console.log(err));
  };

  //  save card
  const toggleSaveCard = (article) => {
    // let tempCardList = [];
    if (article) {
      mainApi.saveArticle(article)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          localStorage.setItem('searchResults', newsCards);
        });
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

  //  login handler
  const loginHandler = (mail, pass) => {
    setIsRegistered(true);
    mainApi.login(mail, pass)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        setIsSignInPopupOpen(false);
        setFailurePopupText('Wrong username or password!');
        setIsFailurePopupOpen(true);
        console.log(err);
      });
  };

  //  logout handler
  const handleLogOut = () => {
    localStorage.clear();
    setSavedArticles([]);
    setIsSavedNewsOpen(false);
    setIsLoggedIn(false);
    setCurrentUser({});
    resetLoginStates();
    navigate('/');
  };

  //  news search
  const handleSearch = (keyword) => newsApi.find(keyword);

  //  download initial top news
  const downloadInitial = () => newsApi.downloadInitial();

  //  capitalize first letter
  const capitalizeFirstLetter = (string) => {
    const keywordsArray = string.split(' ');
    const result = keywordsArray.map(
      (keyword) => {
        const firstLetter = (keyword.charAt(0).toUpperCase());
        const otherLetters = (keyword.slice(1));
        return (`${firstLetter}${otherLetters}`);
      },
    );
    return result.join(' ');
  };
  // const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  //  handle article delete
  const handleDelete = (article) => {
    mainApi.deleteArticle(article)
      .then(() => {
        setSavedArticles((state) => state.filter((c) => c._id !== article._id));
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

  //  refresh list of keywords

  useEffect(() => {
    handleSavedKeywords();
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  //  set user info after reload
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getUserInfo(token)
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
                  toggleSaveCard={toggleSaveCard}
                  isSavedNewsOpen={isSavedNewsOpen}
                  isSearching={isSearching}
                  isLoggedIn={isLoggedIn}
                  setIsSearching={setIsSearching}
                  handleSearch={handleSearch}
                  downloadInitial={downloadInitial}
                  setKeywords={setKeywords}
                  keywords={keywords}
                  setNotFound={setNotFound}
                  notFound={notFound}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  newsCards={newsCards}
                  setNewsCards={setNewsCards}
                  renderCards={renderCards}
                />
              </>
)}
          />
          <Route
            path="/saved-news"
            element={(
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                toggleSignInPopup={toggleSignInPopup}
              >
                <>
                  <Header
                    isRegistered={isRegistered}
                    isLoggedIn={isLoggedIn}
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
                    capitalizeFirstLetter={capitalizeFirstLetter}
                    setIsSortMenuOpen={setIsSortMenuOpen}
                    isSortMenuOpen={isSortMenuOpen}
                    sortingOrder={sortingOrder}
                    setSortingOrder={setSortingOrder}
                  />
                  )}
                  {isLoggedIn && (

                  <SavedNews
                    convertTime={convertTime}
                    toggleSaveCard={toggleSaveCard}
                    isSavedNewsOpen={isSavedNewsOpen}
                    setIsSavedNewsOpen={setIsSavedNewsOpen}
                    savedKeywords={savedKeywords}
                    setSavedKeywords={setSavedKeywords}
                    handleDelete={handleDelete}
                    savedArticles={savedArticles}
                    setSavedArticles={setSavedArticles}
                    capitalizeFirstLetter={capitalizeFirstLetter}
                    sortingOrder={sortingOrder}
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
