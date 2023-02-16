import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль"
      button="Сохранить"
    >
      <fieldset className="form__input-container">
        <label className="form__field">
          <input
            value={name || ""}
            onChange={handleNameChange}
            id="username"
            className="form__input form__input_type_username"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="form__input-error username-error" />
        </label>
        <label className="form__field">
          <input
            value={description || ""}
            onChange={handleDescriptionChange}
            id="userabout"
            className="form__input form__input_type_userabout"
            type="text"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__input-error userabout-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
