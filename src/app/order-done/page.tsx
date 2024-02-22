"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { useAppDispatch } from "@/types/ReduxHooks";
import { QuoteSmallIcon } from "../icons/icon-quote-small";
import { clearOrderFromCart } from "../redux/slices/cartSlice";

import style from "./page.module.scss";

const OrderDone = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearOrderFromCart());
  }, []);

  return (
    <section className={style.orderDone}>
      <h1 className={style.title}>Thank you!</h1>
      <p className={style.text}>
        Your payment has been successfully processed.
        <br />
        <br />
        You can view the details of the order in your account!
      </p>

      <Link href="/account?tab=Orders" className={style.button}>
        My Orders
      </Link>
      <div className={style.quote}>
        <QuoteSmallIcon />
        <p className={style.quoteText}>
          We are also grateful to you for your conscientious charity!
          <br />
          <br />
          Let this artwork inspire you to do good deeds every day!
        </p>
      </div>
      <Image
        src="/assets/thanksOrnament.png"
        alt="Ukrainian gallery ornament"
        width={700}
        height={700}
        className={`${style.imageLeft} ${style.image}`}
      />
      <Image
        src="/assets/thanksOrnament.png"
        alt="Ukrainian gallery ornament"
        width={700}
        height={700}
        className={`${style.imageRight} ${style.image}`}
      />
    </section>
  );
};

export default OrderDone;
