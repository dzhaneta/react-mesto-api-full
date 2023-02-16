// ПИСЬМО-ПАСХАЛКА ДЛЯ РЕВЬЮРА
// Дорогой Ролланд! Спасибо тебе за твои ревью, мы работаем вместе уже над 
// третьей проектной работой и твои правки действительно помогают мне быть 
// лучше и вникать в большее кол-во деталей. Меня заинтересовало доп.задание по
// верстке мобильной версии хедера и даже если работа будет принята, мне было
// бы интересно узнать твое мнение по поводу того, как изящно реализовать 
// иконку меню с выпадающим списком (имейл + "выйти"). Я никак не додумаю, как 
// по-красивому вписать зависимость от очень маленького экрана.
// Заранее спасибо!

import logoPath from "../images/header_logo.svg";
import { Switch, Route, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="логотип Mesto" />
      <div className="header__usermenu">
        <Switch>
          <Route path="/sign-up">
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          </Route>

          <Route path="/sign-in">
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          </Route>

          <Route exact path="/">
            <p className="header__email">{email}</p>
            <Link className="header__link" to="/sign-in" onClick={onSignOut}>
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
