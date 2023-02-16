import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onLogin({
      email,
      password,
    });
  }

  return (
    <div className="auth">
      <form
        onSubmit={handleSubmit}
        className="form form_type_register"
        name="register-form"
      >
        <h2 className="form__title form__title_theme_dark">Вход</h2>
        <fieldset
          className="
                        form__input-container 
                        form__input-container_theme_dark
                    "
        >
          <label className="form__field">
            <input
              value={email || ""}
              onChange={handleEmailChange}
              id="email"
              className="
                            form__input 
                            form__input_type_email 
                            form__input_theme_dark
                        "
              type="email"
              name="email"
              placeholder="Email"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="form__input-error email-error" />
          </label>
          <label className="form__field">
            <input
              value={password || ""}
              onChange={handlePasswordChange}
              id="password"
              className="
                            form__input 
                            form__input_type_userabout 
                            form__input_theme_dark
                        "
              type="password"
              name="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="form__input-error password-error" />
          </label>
        </fieldset>
        <button
          className="form__save-button form__save-button_theme_dark"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
