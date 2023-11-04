'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';

import { Status } from '@/types/Email';
import { emailUnsubscribe } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';

import style from './page.module.scss';

const Unsubscribe = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const headers = createHeaders(user);

  const getEmailUnsubscribe = async (status: Status) => {
    try {
      const response = await emailUnsubscribe(status, headers);
      if (response.ok) {
      }

      console.log(response);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    const status: Status = {
      unsubscribe: true,
    };

    getEmailUnsubscribe(status);
  }, []);

  const handleSubscribe = () => {
    const status: Status = {
      unsubscribe: false,
    };

    getEmailUnsubscribe(status);
  };

  return (
    <div className={style.unsubscribe}>
      <div className={style.container}>
        <h1 className={style.title}>Unsubscribe</h1>
        <p className={style.subTitle}>
          You have been successfully unsubscribed from our email list
        </p>

        <div className={style.subscribe}>
          <p className={style.subscribe__text}>Unsubscribed by accident?</p>
          <button onClick={handleSubscribe} className={style.subscribe__link}>
            Subscribe again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
