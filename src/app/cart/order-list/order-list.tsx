"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

import { removePaintingFromCart } from "@/app/redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { removeOrderPaintingFromServer } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import MightLike from "../might-like/might-like";
import OrderItem from "../order-item/order-item";
import EmptyCartPage from "./empty-cart/empty-cart";

import style from "./order-list.module.scss";

const OrderList = () => {
  const dispatch = useAppDispatch();
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAuthenticator((context) => [context.route]);
  const headers = createHeaders(user);

  const handleRemovePainting = (id: number) => {
    dispatch(removePaintingFromCart(id));

    if (user) {
      removeOrderPaintingFromServer(id, headers);
    }
  };

  const nextCheckoutPath = user ? "/cart/checkout" : "/profile";

  const selectedPaintings = paintings
    .map((painting) => painting.prettyId)
    .join(",");

  return (
    <>
      {paintings.length > 0 && totalPrice > 0 ? (
        <>
          <OrderItem
            paintings={paintings}
            handleRemovePainting={handleRemovePainting}
          />
          <div className={style.totalInfo}>
            <p className={style.totalPrice}>{`Total: ${totalPrice} €`}</p>
            <Link href={nextCheckoutPath} className={style.button}>
              Checkout
            </Link>
          </div>
          {!user && (
            <div className={style.profile}>
              <p className={style.profile__text}>
                To make a purchase you need to&nbsp;&nbsp;
                <Link href={"/profile"} className={style.account}>
                  Log in
                </Link>
              </p>
              <p className={style.profile__login}></p>
            </div>
          )}
          <MightLike selectedPaintings={selectedPaintings} />
        </>
      ) : (
        <EmptyCartPage />
      )}
    </>
  );
};

export default OrderList;
