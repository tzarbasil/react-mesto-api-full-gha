import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function addCardTitle(e) {
        setName(e.target.value);
    }

    function addCardTitleLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    useEffect(() => {
        if (isOpen) {
            setName("");
            setLink("");
        }
    }, [isOpen]);

    return (
        <PopupWithForm name="place-edit" submitText="Добавить" title="Добавить карточку" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <label className="popup__field-text">
                    <input id="place-name-input" type="text" className="popup__input popup-card-name" name="name"
                        placeholder="Название" minLength="2" maxLength="30" required onChange={addCardTitle} value={name} />
                    <span className="popup__form-input-error">Вы пропустили это поле</span>
                </label>
                <label className="popup__field-text">
                    <input type="url" className="popup__input popup-card-secondname" name="link"
                        placeholder="Ссылка на картинку" value={link} onChange={addCardTitleLink} required />
                    <span className="popup__form-input-error">Вы пропустили это поле</span>
                </label>
            </div>
        </PopupWithForm>
    );
}



