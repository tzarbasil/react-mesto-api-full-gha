import { Link } from "react-router-dom";

const AuthorizationForm = (props) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleSubmit()
  }

  return (
    <form className="popup__auth" onSubmit={handleSubmit}>
      <h2 className="popup__auth_title">{props.header}</h2>
      <label className="popup__auth_label" htmlFor="email"></label>
      <input id="email" name="email" className="popup__auth_input" placeholder="Email" type="email" required value={props.inputTypeEmail}
        onChange={props.handleChangeInput}
      ></input>
      <label className="ol sign__label" htmlFor="password"></label>
      <input id="password" name="password" className="popup__auth_input" placeholder="Пароль" type="password" required value={props.inputTypePassword}
        onChange={props.handleChangeInput}></input>
      <button className="popup__auth_submit" type="submit">{props.buttonText}</button>

      {props.showLinkOnLogin && <div className="popup__auth_offer">
        <h2 className="popup__auth_subtitle">Уже зарегистрированы?</h2>
        <Link className="popup__auth_enter" to="/sign-in"> Войти </Link>
      </div>}
    </form>
  );
};

export default AuthorizationForm;