import React                from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext)

  function handleClick() {
    onCardClick(card);
  }

  function handleClickLike() {
    onCardLike(card)
  }

  function handleClickDelete() {
    onCardDelete(card)
  }

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.find(i => i === currentUser._id);

  const cardDeleteButtonClassName = (`element__btn_delete ${isOwn ? 'element__btn_delete_active' : ''}`)
  const cardLikeButtonClassName = (`element__btn_like ${isLiked ? 'element__btn_like_active' : ''}`)

  return (
    <div className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleClickDelete}
        type="button"
        aria-label="Удалить"
      />
      <img
        src={card.link}
        onClick={handleClick}
        className="element__img"
        alt={card.link}
      />
      <div className="element__description">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleClickLike}
            type="button"
            aria-label="Нравиться"
          />
          <span className="element__like_counter">
            {card.likes.length > 0 ? `${card.likes.length}` : '0'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
