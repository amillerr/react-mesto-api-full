import React         from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose, isLoading}) {
  const avatarRef = React.useRef('')

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <>
        <label className="popup__label">
          <input
            ref={avatarRef}
            id="avatar-input"
            type="url"
            className="popup__input popup__input_type_avatar"
            name="avatar"
            placeholder="Ссылка на изображение"
            required
          />
          <span id="avatar-input-error" className="popup__error" />
        </label>
        <button className="popup__button" type="submit">
          Сохранить
        </button>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup