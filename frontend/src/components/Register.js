import React from "react";
import { Link } from 'react-router-dom';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (e)  => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onRegister(email, password)
  }

    return (
      <section className="auth">
        <form
          className="auth__form"
          onSubmit={handleSubmit}
        >
          <h3 className="auth__title">Регистрация</h3>
          <fieldset className="auth__field">
          <input
            name="email"
            type="text"
            className="auth__input"
            value={email || ''}
            onChange={handleChangeEmail}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="text"
            className="auth__input"
            value={password || ''}
            onChange={handleChangePassword}
            required
            placeholder="Пароль"
            minLength="6"
          />
          </fieldset>
          <button
            className="auth__btn"
            type="submit">
            Зарегистрироваться
          </button>
          <Link
            to="/sign-in"
            className="auth__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </section>

    )
}

export default Register
