import React from 'react';
import SuccessIcon from '../images/forms/success.svg'
import FailureIcon from '../images/forms/failure.svg'

function InfoTooltip ({isOpen, onClose, isSuccess}) {

  return (
    <section
      className={`popup popup__tooltip ${isOpen && 'popup_opened'}`}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть"
        />
          <div className="popup__message">
            <img className="popup__result" src={ isSuccess ? SuccessIcon : FailureIcon} alt="Иконка"/>
            <h3 className="popup__result-msg">{ isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
          </div>
      </div>
    </section>
  )
}

export default InfoTooltip
