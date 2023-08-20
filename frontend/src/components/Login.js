import Header from "./Header";
import AuthorizationForm from "./AuthorizationForm";

const Login = (props) => {
  return (
    <>
      <Header link={"/sign-up"} linkText={"Регистрация"} />
      <AuthorizationForm header="Вход" buttonText="Войти" hidden={true} handleSubmit={props.onLogin} inputTypePassword={props.inputTypePassword}
        inputTypeEmail={props.inputTypeEmail} handleChangeInput={props.handleChangeInput} />
    </>
  );
};
export default Login;