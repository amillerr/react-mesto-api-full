import React         from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const titleRef = React.useRef('')
  const linkRef = React.useRef('')

  React.useEffect(() => {
    titleRef.current.value = ''
    linkRef.current.value = ''
  },[isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace ({
      name: titleRef.current.value,
      link: linkRef.current.value
    })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="form-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__label">
          <input
            ref={titleRef}
            id="title-input"
            type="text"
            className="popup__input popup__input_type_place"
            name="title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span id="title-input-error" className="popup__error" />
        </label>
        <label className="popup__label">
          <input
            ref={linkRef}
            id="url-input"
            type="url"
            className="popup__input popup__input_type_link"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="url-input-error" className="popup__error" />
        </label>
        <button className="popup__button" type="submit">
          Создать
        </button>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup


