import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link,
    });
  }

  // очищаем инпуты попапа при закрытии без сабмита
  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add-card"
      title="Новое место"
      button="Создать"
    >
      <fieldset className="form__input-container">
        <label className="form__field">
          <input
            value={name}
            onChange={handleNameChange}
            id="cardtitle"
            className="form__input form__input_type_cardtitle"
            type="text"
            name="card-title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__input-error cardtitle-error" />
        </label>
        <label className="form__field">
          <input
            value={link}
            onChange={handleLinkChange}
            id="cardlink"
            className="form__input form__input_type_cardlink"
            type="url"
            name="card-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__input-error cardlink-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
