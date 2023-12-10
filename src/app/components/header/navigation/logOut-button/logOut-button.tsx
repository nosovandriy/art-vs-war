import style from './logOut-button.module.scss';

type Props = {
  className?: string;
};

const LogOutButton: React.FC<Props> = ({ className }) => {

  return (
    <a href={'/'} className={`${style.loginButton} ${className}`}>
      Sign Out
    </a>
  );
};

export default LogOutButton;
