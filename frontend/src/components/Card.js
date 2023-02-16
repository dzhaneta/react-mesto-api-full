import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
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
        {isOwn && (
          <button
            onClick={handleDeleteClick}
            className="photo-grid__delete-button hover-opacity"
            type="button"
            aria-label="Удалить"
          />
        )}

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
