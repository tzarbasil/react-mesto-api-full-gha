import React from 'react';

function ImagePopup(props) {
    const className = `popup popup_type_card image-popup ${props.card.name ? "popup_opened" : ""}`
    return (
        <div className={className}>
            <div className="popup__card-container">
                <img className="popup__card-image" src={props.card?.link || ""} alt={props.card && props.card.name} />
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
                <h3 className="popup__card-subtitle">{props.card && props.card.name}</h3>
            </div>
        </div>
    );
}
export default ImagePopup;