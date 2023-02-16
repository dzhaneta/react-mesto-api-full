import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";

function App() {
  // state
  const history = useHistory();
  const infoTooltipMessages = {
    succes: "Вы успешно зарегистрировались!",
    fail: "Что-то пошло не так! Попробуйте ещё раз."
  }

  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false);
  const [email, setEmail] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // token checkup
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log("400 — Токен не передан или передан не в том формате");
          } else if (err.status === 401) {
            console.log("401 — Переданный токен некорректен");
          }
        });
    }
  }, [history]);

  // auth handlers

  function handleRegister(data) {
    auth
      .register(data.email, data.password)
      .then((res) => {
        setRegistered(true);
        setIsInfoTooltipOpened(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setRegistered(false);
        setIsInfoTooltipOpened(true);
      });
  }

  function handleLogin(data) {
    auth
      .login(data.email, data.password)
      .then((res) => {
        setLoggedIn(true);
        setEmail(data.email);
        localStorage.setItem("jwt", res.token);
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
        setRegistered(false);
        setIsInfoTooltipOpened(true);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  // user & cards setup

  useEffect(() => {
    if (loggedIn) {
      api
      .getUserInfo()
      .then((profile) => {
        setCurrentUser(profile);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
      .getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  // profile handlers

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // card handlers

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
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
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .saveCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // popup close handler

  function closeAllPopups() {
    setIsInfoTooltipOpened(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSignOut={handleSignOut} />

        <Switch>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />

          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpened}
          onClose={closeAllPopups}
          isSuccess={registered}
          statusMessages={infoTooltipMessages}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          onClose={closeAllPopups}
          name="delete-card"
          title="Вы уверены?"
          button="Да"
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
