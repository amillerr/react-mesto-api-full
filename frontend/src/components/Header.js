import React from "react";
import logo from "../images/header/header__logo.svg";
import { Route, Link } from 'react-router-dom';

function Header({email, onSignOut}) {

  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />

        <Route path="/sign-up">
          <Link className="header__auth_link" to="/sign-in">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__auth_link" to="/sign-up">Регистрация</Link>
        </Route>
        <Route exact path="/">
          <div className="header__auth">
            <p className="header__auth_email">{ email }</p>
            <a className="header__auth_btn" onClick={ onSignOut } type="button">Выйти</a>
          </div>
        </Route>
    </header>
  )
}

export default Header;
