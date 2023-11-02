"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import style from './account.module.scss';
import { authenticatorStylesComponents } from '../profile/aws-authenticator-styles/aws-authenticator-styles';

import { ArrowLeft } from '../icons/icon-arrow-left';
import createHeaders from '@/utils/getAccessToken';
import { AccountData, CreatedAccountResponse } from '@/types/Account';
import RegistersForm from './registers-form/registersForm';
import ShippingForm from './shipping-form/shippingForm';
import { getUserRole } from '@/utils/account';
import { getAccount, getAddress } from '@/utils/api';
import Loading from '../loading';
import Link from 'next/link';
import { ShippingFormData, ShippingResponseData } from '@/types/ShippingForm';
import RegistersData from './registers-form/registersData';
import Image from 'next/image';
import Ornament from "./account_ornament.png";

const Account = () => {
  const router = useRouter();
  const { user } = useAuthenticator((context) => [context.user]);
  const [account, setAccount] = useState<AccountData | null>(null);
  const [address, setAddress] = useState<ShippingFormData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const hasRole = getUserRole(user, 'ROLE_CUSTOMER');
  const hasProfile = getUserRole(user, 'ROLE_AUTHOR');

  const fetchData = async () => {
    const headers = createHeaders(user);
    const fetchedUser: CreatedAccountResponse = await getAccount(headers);
    const fetchedAddress: ShippingResponseData[] = await getAddress(headers)

    const { email, phone, firstName, lastName } = fetchedUser;
    const { addressLine1, addressLine2, city, country, state, postalCode } = fetchedAddress[0];

    setAccount({ email, phone, firstName, lastName });
    setAddress({
      city,
      state,
      country,
      postalCode,
      addressLine2,
      addressLine1: { value: '', label: addressLine1, postalCode: '', state: '', city: '' },
    });

    setIsFetching(false);
  };

  useEffect(() => {

    if (!hasRole) {
      setAccount(null);
      setIsFetching(false);
      return;
    }

    if (user?.username) {
      fetchData();
    }
  }, []);

  const getContent = () => {
    if (account && !isOpenForm) {
      return (
        <RegistersData
          account={account}
          setIsOpenForm={setIsOpenForm}
        />
      )
    }

    return (
      <RegistersForm
        account={account}
        setAccount={setAccount}
        setIsOpenForm={setIsOpenForm}
      />
    )
  };

  return (
    <section className={style.account}>
      <div className={style.ornamentWrapper}>
        <Image
          alt="ornament"
          className={style.ornament}
          src={Ornament}
          width={370}
          height={690}
        />
      </div>
      {isFetching
        ? <Loading />
        : (
          <>
            <button
              type="button"
              className={style.arrowMobile}
              onClick={() => router.back()}
              >
              <ArrowLeft />
            </button>

            <div className={style.formContainer}>
              <div className={style.titleContainer}>
                <button
                  type="button"
                  className={style.arrow}
                  onClick={() => router.back()}
                  >
                  <ArrowLeft />
                </button>

                <h2 className={style.title}>
                  {(account && !isFetching) ? 'Account' : 'Create account'}
                </h2>
              </div>

              {(account && !hasProfile) && (
                <div className={style.subtitle}>
                  <>
                    <Link href="/profile" className={style.login}>Click here</Link>
                    <span> to create an Artist Profile now!</span>
                  </>
                </div>
              )}

              {getContent()}

              {account && (
                <ShippingForm
                  account={account}
                  address={address}
                  setAccount={setAccount}
                />
              )}
            </div>
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
