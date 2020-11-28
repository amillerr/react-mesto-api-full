/* eslint-disable react-hooks/exhaustive-deps */
  import React, { useEffect } from "react";
  import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
  import Header from "./Header";
  import Main from "./Main";
  import Footer from "./Footer";
  import ImagePopup from "./ImagePopup";
  import AddPlacePopup from "./AddPlacePopup";
  import {api} from "../utils/api";
  import {CurrentUserContext} from '../context/CurrentUserContext'
  import EditAvatarPopup from "./EditAvatarPopup";
  import EditProfilePopup from './EditProfilePopup'
  import PopupWithForm from "./PopupWithForm";
  import Login from './Login'
  import Register from './Register'
  import ProtectedRoute from "./ProtectedRoute";
  import InfoTooltip from './InfoTooltip'

  import * as auth from '../utils/auth'

  function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); //
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); //
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); //
    const [selectedCard, setSelectedCard] = React.useState(""); //
    const [currentUser, setCurrentUser] = React.useState({}); //
    const [cards, setCards] = React.useState([]); //

    const [loggedIn, setLoggedIn] = React.useState(false); //
    const [infoTooltipPopup, setInfoTooltipPopup] = React.useState(false); //
    const [isSuccess, setIsSuccess] = React.useState(false); //
    const [email, setEmail] = React.useState(''); //
    const history = useHistory(); //

    useEffect(() => {
      if (loggedIn) {
        api.getServerData()
        .then(([userData, initialCards]) => {
          setCurrentUser(userData)
          setCards(initialCards);
        })
        .catch(error => console.log(error))
        }
      }, [loggedIn]);


    function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
    }
    
    const handleConfirmRegister = (foo) => {
      setInfoTooltipPopup(true)
      setIsSuccess(foo)
    }

    function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setSelectedCard('');
      setInfoTooltipPopup(false)
    }

    function handleCardClick(card) {
      setSelectedCard(card);
    }

    function handleUpdateAvatar(data) {
      api.changeAvatar(data)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups()
        })
        .catch(error => console.log(error))
    }

    function handleUpdateUser(data) {
      api.setUserInfo(data)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups()
        })
        .catch(error => console.log(error))
    }

    function handleDeleteCard(card) {
      api.deleteCard(card._id)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== card._id)
          setCards(newCards)
        })
        .catch(error => console.log(error))
    }

    function handleLikeCard(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id)
    if (!isLiked) {
      api.likeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c)
          setCards(newCards)
        })
        .catch(error => console.log(error));
    } else {
      api.dislikeCard(card._id)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
    })
    .catch((error) =>  console.log(error));
    }
  };

    function handleAddPlaceSubmit(item) {
      api.createCard(item)
        .then((res) => {
          setCards([res, ...cards])
          closeAllPopups()
        })
        .catch(error => console.log(error))
    }

    const tokenCheck = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setEmail(res.email)
            history.push('/')
          }
        })
        .catch((err) => {console.log(err)})
        history.push('./sign-in');
      }
    }

    const handleRegister = (email, password) => {
      auth.register(email, password)
        .then((res) => {
          if (res) {
            handleConfirmRegister(true)
            history.push('./sign-in')
          } else {
            handleConfirmRegister(false);
          }
        })
        .catch((err) => {console.log(err.message)})
    }

    const handleLogin = (email, password) => {
      auth.login(email, password)
      .then(data => {
        if (data.token) {
          setEmail(email)
          setLoggedIn(true)
          history.push('/')
          }
        })
        .catch((err) => {console.log(err.message)})
    }

    const onSignOut = () => {
      localStorage.removeItem('jwt')
      history.push('/')
      setEmail('')
      setLoggedIn(false)
    }

    useEffect(() => {
      tokenCheck();
    }, []);

      return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="page">
            <Header
              email={email}
              onSignOut={onSignOut}
              loggedIn={loggedIn}
            />
            <Switch>

              <Route path='/sign-in'>
                <Login
                  onLogin={handleLogin}
                />
              </Route>

              <Route path='/sign-up'>
                <Register
                  onRegister={handleRegister}
                />
              </Route>

            <ProtectedRoute 
              path="/" 
              loggedIn={loggedIn} 
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleLikeCard}
              onCardDelete={handleDeleteCard}
            />

            <Route path='/'>
              {loggedIn ? <Redirect to='/'/> : <Redirect to='/sign-in'/>}
            </Route>

            </Switch>

            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateProfile={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <PopupWithForm
              title="Вы уверены?"
              name="form-confirm"
              onClose={closeAllPopups}>

            </PopupWithForm>

            <ImagePopup
              card={selectedCard}
              isClose={closeAllPopups}
            />

            <InfoTooltip
              isOpen={infoTooltipPopup}
              onClose={closeAllPopups}
              isSuccess={isSuccess}
            />

          </div>
        </div>
      </CurrentUserContext.Provider>
    );
  }

  export default App;
