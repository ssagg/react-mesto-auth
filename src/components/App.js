import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import * as Auth from "./Auth.js";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Registration from "./Registration";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { UserDataContext } from "../contexts/UserDataContext.js";
import { LoginDataContext } from "../contexts/LoginDataContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });

  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState({});
  const [isRegSuccess, setIsRegSuccess] = useState(false);

  const [cards, setCards] = useState([]);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isRegPopupOpen ||
    selectedCard.isOpen;

  const navigate = useNavigate();

  function handleLogin() {
    setLoggedIn(true);
  }
  function handleLogout() {
    setLoggedIn(false);
  }
  function loadUserEmail(res) {
    setUserEmail(res);
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.userValidation(token).then((res) => {
        if (res) {
          console.log(res);
          setLoggedIn(true);
          loadUserEmail(res);
          navigate("/cards", { replace: true });
        }
      });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [loggedIn]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards([...cards]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    setButtonText("Сохранить");
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    setButtonText("Сохранить");
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    setButtonText("Создать");
  }
  function handleCardClick(card) {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      link: card.link,
      name: card.name,
    });
  }
  function handleRegistration(data) {
    setIsRegPopupOpen(!isRegPopupOpen);
    console.log(data);
    if (data.data) {
      setIsRegSuccess(true);
    } else {
      setIsRegSuccess(false);
    }
    // setIsRegSuccess(true);
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .setLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRegPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard({ name: data.name, link: data.link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .sendUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .sendAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <UserDataContext.Provider value={userEmail}>
          <LoginDataContext.Provider value={loggedIn}>
            <Header
              loggedIn={loggedIn}
              userEmail={userEmail}
              handleLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                  loggedIn ? (
                    <Navigate to="/cards" replace />
                  ) : (
                    <Navigate to="/sign-in" replace />
                  )
                }
              />
              <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
                <Route
                  path="/cards"
                  element={
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                    />
                  }
                />
              </Route>

              <Route
                path="/sign-in"
                element={
                  <Login
                    handleLogin={handleLogin}
                    setUserEmail={setUserEmail}
                    loadUserEmail={loadUserEmail}
                  />
                }
              />
              <Route
                path="/sign-up"
                element={
                  <Registration handleRegistration={handleRegistration} />
                }
              />
            </Routes>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              buttonText={buttonText}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              buttonText={buttonText}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoading}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              buttonText={buttonText}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />
            <InfoTooltip
              isOpen={isRegPopupOpen}
              onClose={closeAllPopups}
              isRegSuccess={isRegSuccess}
            />

            <Footer />
          </LoginDataContext.Provider>
        </UserDataContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
