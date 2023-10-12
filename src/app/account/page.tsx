"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import style from './account.module.scss';
import { authenticatorStylesComponents } from '../profile/aws-authenticator-styles/aws-authenticator-styles';

import { ArrowLeft } from '../icons/icon-arrow-left';
import createHeaders from '@/utils/getAccessToken';
import { AccountData, CreatedAccountResponse } from '@/types/Account';
import RegistersForm from './assets/registers-form/registersForm';
import ShippingForm from './assets/shipping-form/shippingForm';
import { getUserRole } from '@/utils/account';
import { getAccount } from '@/utils/api';
import Loading from '../loading';
import Link from 'next/link';

const Account = () => {
  const router = useRouter();
  const { user } = useAuthenticator((context) => [context.user]);
  const [account, setAccount] = useState<AccountData | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchData = async () => {
    const headers = createHeaders(user);
    const fetchedUser: CreatedAccountResponse = await getAccount(headers);

    setAccount({
      email: fetchedUser?.email,
      phone: fetchedUser?.phone,
      firstName: fetchedUser?.firstName,
      lastName: fetchedUser?.lastName,
    });
  };

  useEffect(() => {
    const hasRole = getUserRole(user, 'ROLE_CUSTOMER');

    if (!hasRole) {
      setAccount(null);
      setIsFetching(false);
      return;
    }

    if (user?.username) {
      fetchData();
    }

    setIsFetching(false);

    return setIsFetching(false);
  }, [user]);

  return (
    <section className={style.account}>
      <div className={style.titleContainer}>
        <button
          type="button"
          className={style.arrow}
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>

        <h2 className={style.title}>
          {account ? 'Account' : 'Create account'}
        </h2>
      </div>

      <div className={style.subtitle}>
      {account && (
        <>
          <Link href="/profile" className={style.login}>Click here</Link>
          <span> to unlock your artistic potential and create an Artist Account now!</span>
        </>
      )}
      </div>


      {isFetching
        ? <Loading />
        : (
          <>
            <RegistersForm
              account={account}
              setAccount={setAccount}
            />

            {account && (
              <ShippingForm
                account={account}
                setAccount={setAccount}
              />
            )}
          </>
        )
      }

    </section>
  );
};

const AccountPage = () => (
  <Authenticator
    className={style.auth}
    components={authenticatorStylesComponents}
  >
    <Account/>
  </Authenticator>
)

export default AccountPage;
