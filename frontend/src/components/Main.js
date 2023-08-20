import React, { useContext } from 'react';
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, onCardLike
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile" id="userId">
        <div className="profile__avatar-wrap">
          <img className="profile__avatar" src={currentUser.avatar} alt="Ваш аватар" />
          <button className="profile__avatar-edit" aria-label="Изменить аватар" type="button" onClick={onEditAvatar}></button>
        </div>

        <div className="profile__wrap">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="card" aria-label="Карточки">
        {cards.map((card) => (
          <Card
            src={card.link}
            name={card.name}
            key={card._id}
            card={card}
            likes={card.likes}
            owner={card.owner}
            cardId={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  )
}
