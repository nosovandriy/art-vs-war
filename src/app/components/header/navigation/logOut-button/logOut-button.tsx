import style from './logOut-button.module.scss';

type Props = {
  className?: string;
};
import { usePathname } from 'next/navigation';

const LogOutButton: React.FC<Props> = ({ className }) => {
  const pathName = usePathname();

  return (
    <a href={pathName} className={`${style.loginButton} ${className}`}>
      Sign Out
    </a>
  );
};

export default LogOutButton;
