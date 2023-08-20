import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";

import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from './AddPlacePopup';

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from '../utils/Api.js'


// Авторизация
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import { authorization, register, isTockenValid } from "../utils/Authorization";



function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: " ",
    subtitle: " ",
    avatar: " ",
    _id: " ",
  });

  const [cards, setCards] = useState([]);
  const [registrated, setRegistrated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerEmail, setHeaderEmail] = useState("email@yandex.ru");
  const [authData, setAuthData] = useState({
    password: "",
    email: "",
  });

  const popupOpened = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isInfoTooltipOpen;


  const updateUserData = (user) => {
    api
      .setProfileInformation(user)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };

  const updateAvatar = (avatar) => {
    api
      .patchAvatarInfo(avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    tokenCheck();
    api.getProfileInformation()
      .then((profileInformation) => {
        setCurrentUser(profileInformation)
      })
      .catch((error) => console.log(error));

    api.getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.log(error));
  }, []);


  const logOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate('/sign-in');
  }


  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    isTockenValid(jwt).then((response) => {
      setHeaderEmail(response.data.email);
      setLoggedIn(true);
    }).then(() => navigate("/"))
      .catch((err) => console.error(err));
  }

  const registerUser = () => {
    setRegistrated(false);
    const { password, email } = authData;
    register(password, email)
      .then((response) => {
        if (response.data.email) {
          setRegistrated(true);
          navigate("/sign-in");
        }
      })
      .then(() => {
        setAuthData({ password: "", email: "" });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsInfoTooltipOpen(true));
  };

  const loginUser = () => {
    const { password, email } = authData;
    authorization(password, email)
      .then((response) => {
        if (response.token) {
          localStorage.setItem("jwt", response.token);
          setHeaderEmail(email);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .then(() => {
        setAuthData({ password: "", email: "" });
      })
      .catch((err) => console.error(err));
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setAuthData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };


  // АПИ КАРТОЧКИ

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddPlaceSubmit = (card) => {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(error));
  };


  function handleOpenEditPopup() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleOpenPlacePopup() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleOpenAvatarPopup() {
    setIsAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleOpenCardPopup(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAvatarPopupOpen(false)
    setisAddPlacePopupOpen(false)
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className="App">
      <div className='body'>
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <Routes>

              <Route path="/sign-up"
                element={<Register onRegister={registerUser} passowrdInput={authData.password} inputTypeEmail={authData.email}
                  handleChangeInput={handleChangeInput} />} />

              <Route path="/sign-in" element={
                <Login onLogin={loginUser} passowrdInput={authData.password} inputTypeEmail={authData.email} handleChangeInput={handleChangeInput} />
              } />

              <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>

                <Route path="/" element={
                  <> <Header link={"/sign-in"} headerEmail={headerEmail} linkText={"Выйти"} onSignOut={logOut} />

                    <Main onEditProfile={handleOpenEditPopup} onEditAvatar={handleOpenAvatarPopup} onAddPlace={handleOpenPlacePopup}
                      onCardClick={handleOpenCardPopup} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />
                  </>}  >
                </Route>
              </Route>
            </Routes>
            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={updateUserData} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={updateAvatar} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

            {/* Попап ошибки/подтверждения */}
            <InfoTooltip name="info" containerType="infoTooltip" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} checkResponse={registrated}
            />
          </CurrentUserContext.Provider>
        </div>
      </div>
    </div >
  );
}
export default App;
