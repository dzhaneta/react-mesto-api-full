
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
