import Header from "./Header";
import AuthorizationForm from "./AuthorizationForm";

const Register = (props) => {
  return (
    <>
      <Header link={"/sign-in"} linkText={"Войти"} />
      <AuthorizationForm header="Регистрация" buttonText="Зарегистрироваться" hidden={false} handleSubmit={props.onRegister}
        inputTypePassword={props.inputTypePassword} inputTypeEmail={props.inputTypeEmail} handleChangeInput={props.handleChangeInput} />
    </>
  );
};
export default Register;