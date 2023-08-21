import Link from "next/link";

import { ArrowBackIcon } from "@/app/icons/icon-arrow-back";
import OrderList from "./order-list/order-list";

import style from "./page.module.scss";

const Cart = () => {
  return (
    <section className={style.cart}>
      <div className={style.titleWrapper}>
        <Link href={`/gallery`}>
          <div className={style.arrowBack}>
            <ArrowBackIcon />
          </div>
        </Link>
        <h1 className={style.title}>Cart</h1>
      </div>

      <div className={style.paintingWrapper}>
        <OrderList />
      </div>
    </section>
  );
};

export default Cart;
