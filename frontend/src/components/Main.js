import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  cards,
  onCardLike,
  onCardClick,
  onCardDelete,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="фото профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__bio">{currentUser.about}</p>
          <button
            onClick={onEditProfile}
            className="profile__edit-button hover-opacity"
            type="button"
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button hover-opacity"
          type="button"
        ></button>
      </section>

      <section className="gallery">
        <ul className="photo-grid">
          {cards.map((item, i) => (
            <Card
              userID={currentUser._id}
              onClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              card={item}
              key={item._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
