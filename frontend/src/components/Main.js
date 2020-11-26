import React                from "react";
import Card                 from "./Card.js";
import {CurrentUserContext} from "../context/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onCardDelete, onAddPlace, cards, onCardClick , onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__image">
          <img
            alt={""}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            className="profile__avatar"
          />
          <button
            onClick={onEditAvatar}
            className="profile__avatar_change"
            type="button"
          />
        </div>
        <div className="profile__info">
          <div className="profile__edit-form">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-btn"
              type="button"
              aria-label="Редактировать"
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-btn"
          type="button"
          aria-label="Добавить"
        />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((item, index) =>
            <Card
              key={index}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
