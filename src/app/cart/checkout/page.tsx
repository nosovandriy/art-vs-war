"use client";

import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

import { ArrowBackIcon } from "@/app/icons/icon-arrow-back";

import style from "./page.module.scss";
import OrderInfo from "./order-info/order-info";
import { useEffect } from "react";

const Checkout = () => {
  const { user } = useAuthenticator((context) => [context.route]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/profile");
    }
  }, [user]);

  return (
    <section className={style.cart}>
      <div className={style.titleWrapper}>
        <Link href={`/cart`}>
          <div className={style.arrowBack}>
            <ArrowBackIcon />
          </div>
        </Link>
        <h1 className={style.title}>Checkout</h1>
      </div>

      <div className={style.paintingWrapper}>
        <OrderInfo />
      </div>
    </section>
  );
};

export default Checkout;
