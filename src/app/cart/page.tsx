'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowBackIcon } from '@/app/icons/icon-arrow-back';
import OrderList from './order-list/order-list';

import style from './page.module.scss';
import EmptyCartPage from './order-list/empty-cart/empty-cart';
import { useAppSelector } from '@/types/ReduxHooks';

const Cart = () => {
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const router = useRouter();

  return (
    <section className={style.cart}>
      <div className={style.titleWrapper}>
        <div className={style.arrowBack} onClick={() => router.back()}>
          <ArrowBackIcon />
        </div>
        <h1 className={style.title}>Cart</h1>
      </div>
      {paintings.length > 0 && totalPrice > 0 ? (
        <div className={style.paintingWrapper}>
          <OrderList />
        </div>
      ) : (
        <EmptyCartPage />
      )}
    </section>
  );
};

export default Cart;
