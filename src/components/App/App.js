/* eslint-disable prettier/prettier */
import './App.css';
import { useState } from 'react/cjs/react.development';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const toggleRegistered = () => {
    setIsRegistered(!isRegistered);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
      <PopupWithForm
        isOpen={isPopupOpen}
        togglePopup={togglePopup}
        isRegistered={isRegistered}
        toggleRegistered={toggleRegistered}
      />
    </div>
  );
}

export default App;
