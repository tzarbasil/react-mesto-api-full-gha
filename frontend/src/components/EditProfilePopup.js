import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function setProfileTitle(e) {
        setName(e.target.value);
    }

    function setProfileSubtitle(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="edit" submitText="Сохранить" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose}
            onSubmit={handleSubmit}>
            <div className="popup__field">
                <label className="popup__field-text">
                    <input value={name || ''} className="popup__input popup__input_type_name" placeholder="Ваше имя" name="name" type="text"
                        minLength={2} maxLength={40} required onChange={setProfileTitle} />
                    <span className="popup__form-input-error">Вы пропустили это поле</span>
                </label>

                <label className="popup__field-text">
                    <input value={description || ''} className="popup__input popup__input_type_subtitle" type="text" placeholder="Подпись"
                        name="about" minLength={2} maxLength={40} required onChange={setProfileSubtitle} />
                    <span className="popup__form-input-error">Вы пропустили это поле</span>
                </label>
            </div>
            <span className="popup__span popup__span_error_visible about-input-error"></span>
        </PopupWithForm>
    );
}