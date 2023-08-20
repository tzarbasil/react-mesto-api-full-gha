import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some((likerId) => likerId === currentUser._id);

    function openImagePopup() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="card__container">
            {isOwn && (<button className="card__delete" type="button" onClick={handleDeleteClick}></button>)}
            <img className="card__image" src={card.link || ""} alt={card.name} onClick={openImagePopup} />
            <div className="card__info">
                <h2 className="card__title">{card.name}</h2>
                <div className="like__container">
                    <button className={`card__like ${isLiked && "card__like_active"}`} type="button" onClick={handleLikeClick}></button>
                    <p className="card__like_counter"> {card.likes.length > 0 ? card.likes.length : null}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;