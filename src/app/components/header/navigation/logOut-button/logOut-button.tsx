import style from "./logOut-button.module.scss";

type Props = {
  className?: string;
};

const LogOutButton: React.FC<Props> = ({ className }) => {
  return <div className={`${style.loginButton} ${className}`}>Sign Out</div>;
};

export default LogOutButton;
