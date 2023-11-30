'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import style from '@styles/global-error.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const route = useRouter();

  return (
    <div className={style.error}>
      <h1 className={style.title}>Something went wrong!</h1>
      <p className={style.description}>
        Please try again later or contact support if the problem persists
      </p>
      <div className={style.buttons}>
        <button className={`${style.button} ${style.buttonTry}`} onClick={() => reset()}>
          Try again
        </button>
        <button className={`${style.button} ${style.buttonMain}`} onClick={() => route.push('/')}>
          Go back Home
        </button>
      </div>
    </div>
  );
}
