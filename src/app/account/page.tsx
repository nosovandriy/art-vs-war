"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Accordion, AccordionItem } from '@nextui-org/react';

import style from './account.module.scss';

import Loading from '../loading';
import OrdersList, { accordionStyles } from './orders/ordersList';
import Ornament from "./account_ornament.png";
import createHeaders from '@/utils/getAccessToken';
import RegistersForm from './registers-form/registersForm';
import RegistersData from './registers-form/registersData';
import { getUserRole } from '@/utils/account';
import { ArrowLeft } from '../icons/icon-arrow-left';
import { getAccount, getAddress, getOrders } from '@/utils/api';
import { AccountData, CreatedAccountResponse, Order } from '@/types/Account';
import { ShippingFormData, ShippingResponseData } from '@/types/ShippingForm';
import { authenticatorStylesComponents } from '../profile/aws-authenticator-styles/aws-authenticator-styles';
import { ArrowDownIcon } from '../icons/iconArrowUp/icon-arrow-down';
import Shipping from './shipping-form/shipping';
import EmptyBlock from '../artists/[slug]/artistTabs/empty/emptyBlock';

const Account = () => {
  const router = useRouter();
  const { user } = useAuthenticator((context) => [context.user]);
  const [account, setAccount] = useState<AccountData | null>(null);
  const [address, setAddress] = useState<ShippingFormData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const hasRole = getUserRole(user, 'ROLE_CUSTOMER');
  const hasProfile = getUserRole(user, 'ROLE_AUTHOR');

  const fetchData = async () => {
    const headers = createHeaders(user);

    try {
      const fetchedUser: CreatedAccountResponse = await getAccount(headers);
      const fetchedAddress: ShippingResponseData[] = await getAddress(headers);
      const fetchedOrders: Order[] = await getOrders(headers);

      const { email, phone, firstName, lastName } = fetchedUser;

      setAccount({ email, phone, firstName, lastName });
      setOrders(fetchedOrders);

      if (fetchedAddress?.length) {
        const {
          city,
          state,
          country,
          postalCode,
          addressLine1,
          addressLine2,
        } = fetchedAddress[0];

        setAddress({
          city,
          state,
          country,
          postalCode,
          addressLine2,
          addressLine1: { value: '', label: addressLine1, postalCode: '', state: '', city: '' },
        });
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false);
    }
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
        ? <Loading className={style.loading} />
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
                <>
                  <Shipping
                    account={account}
                    address={address}
                    setAddress={setAddress}
                    setAccount={setAccount}
                  />

                  {orders.length > 0 ? (
                    <OrdersList
                      user={user}
                      orders={orders}
                    />
                  ) : (
                    <Accordion>
                      <AccordionItem
                        key="Orders"
                        title="Orders"
                        aria-label="Orders"
                        classNames={accordionStyles}
                        indicator={<ArrowDownIcon />}
                      >
                        <EmptyBlock title="There are no orders yet" />
                      </AccordionItem>
                    </Accordion>
                  )}
                </>
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
