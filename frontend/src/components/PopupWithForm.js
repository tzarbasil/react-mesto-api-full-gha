import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, children, submitText, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""} `}>
      <div className={`popup__container popup__container_${name}`}>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={`popup__form_${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__submit" type='submit'>{submitText}</button>
        </form>

        <button className="popup__close-button" type="button" onClick={onClose} aria-label="Закрыть"></button>
      </div>
    </div>
  );
}
export default PopupWithForm;
