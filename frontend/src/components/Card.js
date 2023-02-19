import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "photo-grid__delete-button hover-opacity" : ""
  }`;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClassName = `photo-grid__like-button ${
    isLiked ? "photo-grid__like-button_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card" id={card._id}>
      <div className="photo-grid__item">
        <button
          onClick={handleDeleteClick}
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="Удалить"
        />

        <img
          onClick={() => onClick(card)}
          className="photo-grid__pic"
          src={card.link}
          alt={card.name}
        />
        <div className="photo-grid__pic-info">
          <h2 className="photo-grid__pic-title">{card.name}</h2>
          <div className="photo-grid__like-container">
            <button
              onClick={handleLikeClick}
              className={cardLikeButtonClassName}
              type="button"
              aria-label="Нравится"
            ></button>
            <p className="photo-grid__pic-likes">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
