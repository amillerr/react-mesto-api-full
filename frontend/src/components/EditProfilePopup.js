import React                from "react";
import PopupWithForm        from "./PopupWithForm";
import {CurrentUserContext} from "../context/CurrentUserContext";

function EditProfilePopup({onUpdateProfile, isOpen, onClose, isLoading}) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [about, setAbout] = React.useState('')

  function handleUpdateName(e) {
    setName(e.target.value)
  }

  function handleUpdateAbout(e) {
    setAbout(e.target.value)
  }

  React.useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateProfile({
      name: name,
      about: about
    })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="form-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
        <label className="popup__label">
          <input
            onChange={handleUpdateName}
            id="name-input"
            type="text"
            className="popup__input popup__input_type_name"
            value={name ? name : ''}
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="name-input-error" className="popup__error" />
        </label>
        <label className="popup__label">
          <input
            onChange={handleUpdateAbout}
            id="about-input"
            type="text"
            className="popup__input popup__input_type_description"
            value={about ? about : ''}
            name="about"
            placeholder="Описание"
            minLength="2"
            maxLength="200"
            required
          />
          <span id="about-input-error" className="popup__error" />
        </label>
        <button className="popup__button" type="submit">
          Сохранить
        </button>
    </PopupWithForm>
  )
}

export default EditProfilePopup