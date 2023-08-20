import imgSuccess from "../images/SuccessfulAuth.svg";
import imgError from "../images/FailedAuth.svg";

const InfoTooltip = (props) => {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`} id={props.name} onClick={props.onClick}>
      <div className={`popup__container ${props.containerType}`}>
        <img className="popup__tooltip-image" alt={props.checkResponse ? 'Вы успешно зарегестрировались' : "Что-то пошло не так! Попробуйте ещё раз."} src={props.checkResponse ? imgSuccess : imgError} />
        <h2 className="popup__tooltip-subtitle">{props.checkResponse ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        <button className={`popup__close-button`} type="button" onClick={props.onClose} />
      </div>
    </div>
  );
};
export default InfoTooltip;