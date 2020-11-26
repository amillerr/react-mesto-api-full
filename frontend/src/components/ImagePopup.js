import React from "react";

function ImagePopup({ card, isClose }) {
  return (
    <section className={`popup popup_image ${card && 'popup_opened'}`}>
      <figure className="popup__image_container">
        <button
          onClick={isClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть"
        />
        <img src={`${card.link}`} alt={''} className="popup__preview"/>
        <figcaption className="popup__image-title">{card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
