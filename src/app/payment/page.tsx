'use client';

import style from './page.module.scss';

const Payment = () => {
  return (
    <section className={style.payment}>
      <h1 className={style.title}>Payment</h1>

      <div className={style.contentWrapper}>
        <p className={style.description}>
          Art vs War provides several secure and reliable ways to pay for artwork.
        </p>
        <div className={style.list}>
          <div className={style.listWrapper}>
            <p>Cards:</p>
            <p>Visa, Mastercard, American Express, Discover, Diners Club, China UnionPay.</p>
          </div>
          <div className={style.listWrapper}>
            <p>Wallets:</p>
            <p>PayPal, Link.</p>
          </div>
          <div className={style.listWrapper}>
            <p>Bank redirects:</p>
            <p>Bancontact, EPS, giropay, iDEAL, Przelewy24.</p>
          </div>
        </div>
        <p className={style.description}>
          Once the payment is received, the order will be created and Art vs War will email you to
          inform you about the order details.
        </p>
      </div>
    </section>
  );
};

export default Payment;
