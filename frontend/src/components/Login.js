import React from "react";

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('')

  const handleChangeEmail = (e)  => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
    if (!email || !password) {
      return;
    }
    props.onLogin (email, password);
  }

    return (
      <section className="auth">
        <form
          className="auth__form"
          onSubmit={handleSubmit}
        >
          <h3 className="auth__title">Вход</h3>
          <fieldset className="auth__field">
            <input
              name="email"
              type="email"
              className="auth__input"
              value={email || ''}
              onChange={handleChangeEmail}
              placeholder="Email"
              required
            />
            <input
              name="password"
              type="password"
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
            Войти
          </button>
        </form>
      </section>
    )
}

export default Login


