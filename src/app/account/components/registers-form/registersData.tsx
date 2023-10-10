import { Dispatch, FC, SetStateAction } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

import style from '../../account.module.scss'

import { AccountData } from '@/types/Account';
import { LogoutIcon } from '@/app/icons/icon-logout';

type Props = {
  account:AccountData;
  setIsOpenForm: Dispatch<SetStateAction<boolean>>;
}

const RegistersData: FC<Props> = ({ account, setIsOpenForm }) => {
  const { signOut } = useAuthenticator((context) => [context.signOut]);
  const { firstName, lastName, phone } = account;

  return (
    <div className={style.form}>
      <div className={style.container}>
        <div className={style.dataContainer}>
          <div>First Name</div>
          <div className={style.input}>
            <div className={style.inputData}>{firstName}</div>
          </div>
        </div>

        <div className={style.dataContainer}>
          <div>Last Name</div>
          <div className={style.input}>
            <div className={style.inputData}>
              {lastName}
            </div>
          </div>
        </div>

        <div className={style.dataContainer}>
          <div>Phone number</div>
          <div className={style.input}>
            <div className={style.inputData}>
              {phone}
            </div>
          </div>
        </div>

        <div className={style.buttonContainer}>
          <button
            type='button'
            className={style.submit}
            onClick={() => setIsOpenForm(true)}
          >
            Edit account
          </button>

          <button
            type='reset'
            className={style.signOut}
            onClick={signOut}
          >
            <LogoutIcon />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistersData;
