import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatar = useRef();

    useEffect(() => {
        avatar.current.value = "";
    }, [avatar, isOpen]);


    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatar.current.value,
        });
    }

    return (
        <PopupWithForm name="avatar" submitText="Сохранить" title="Редактировать аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <label className="popup__field-text">
                    <input type="url" className="popup__input popup-card-secondname" name="avatar"
                        placeholder="Ссылка на аватар" required ref={avatar} />
                    <span className="popup__form-input-error">Вы пропустили это поле</span>
                </label>
            </div>
        </PopupWithForm>
    );
}