'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Status, SubscriptionStatus } from '@/types/Email';
import { emailUnsubscribe } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';

import style from './page.module.scss';

const Unsubscribe = () => {
  const [subStatus, setSubStatus] = useState<SubscriptionStatus>('unsubscribe');
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const headers = createHeaders(user);

  const email = user?.attributes?.email;

  const getEmailUnsubscribe = async (status: boolean) => {
    try {
      const statusValue: Status = {
        unsubscribe: status,
      };

      const response = await emailUnsubscribe(statusValue, headers);
      if (response.ok) {
        if (statusValue.unsubscribe) {
          setSubStatus('subscribe');
        } else {
          setSubStatus('subscribed');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/account');
    }
  }, [user]);

  return (
    <>
      {subStatus === 'unsubscribe' && (
        <div className={style.unsubscribe}>
          <div className={style.container}>
            <h2 className={style.title}>Unsubscribe</h2>
            <p className={style.subTitle}>Your email address</p>
            <p className={style.email}>{email}</p>
            <p className={style.receiveEmail}>
              You won&apos;t receive any more Emails from Art vs War
            </p>
            <button className={style.button} onClick={() => getEmailUnsubscribe(true)}>
              Unsubscribe
            </button>
          </div>
        </div>
      )}
      {subStatus === 'subscribe' && (
        <div className={style.unsubscribe}>
          <div className={style.containerSubscribe}>
            <h2 className={style.title}>Unsubscribe</h2>
            <p className={style.subTitle}>
              You have been successfully unsubscribed from our email list
            </p>

            <div className={style.subscribe}>
              <p className={style.subscribe__text}>Unsubscribed by accident?</p>
              <button onClick={() => getEmailUnsubscribe(false)} className={style.subscribe__link}>
                Subscribe again
              </button>
            </div>
          </div>
        </div>
      )}
      {subStatus === 'subscribed' && (
        <div className={style.unsubscribe}>
          <div className={style.container}>
            <h2 className={style.title}>
              Thank You<br></br> for subscribing
            </h2>
            <p className={style.receiveEmail}>
              You have subscribed again and Your Email<br></br> {email}
              <br></br> has been added to the mailing list
            </p>

            <Link href="/gallery" className={style.button}>
              Gallery
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Unsubscribe;
