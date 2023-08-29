import style from "./login-button.module.scss";

type Props = {
  className: string;
};

const LoginButton: React.FC<Props> = ({ className }) => {
  return <div className={`${style.loginButton} ${className}`}>Sign In</div>;
};

export default LoginButton;
