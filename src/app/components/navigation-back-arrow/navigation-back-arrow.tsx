'use client';

import { useRouter } from 'next/navigation';
import { ArrowBackIcon } from '@/app/icons/icon-arrow-back';

import style from './navigation-back-arrow.module.scss';

const NavigationBackArrow = () => {
  const router = useRouter();

  return (
    <button className={style.arrowBack} onClick={() => router.back()}>
      <ArrowBackIcon />
    </button>
  );
};

export default NavigationBackArrow;
