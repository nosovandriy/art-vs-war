"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import { LockIcon } from "@/app/icons/icon-lock";
import { SupportIcon } from "@/app/icons/icon-support";
import { CartItem } from "@/types/CartItem";
import { useAppSelector } from "@/types/ReduxHooks";
import { ShippingInfo } from "@/types/ShippingForm";
import { getStripeLink } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import { setDataToLocalStorage } from "@/utils/localStorageData";

import style from "./order-summary.module.scss";
import Loading from "@/app/loading";
import ButtonLoader from "@/app/components/button-loader/button-loader";

const OrderSummary = () => {
  const [orderError, setOrderError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const { totalShippingInfo, shippingAddress } = useAppSelector(
    (state) => state.shipping
  );
  const { user } = useAuthenticator((context) => [context.route]);
  const headers = createHeaders(user);
  const router = useRouter();

  const handleGetStripeUrl = async () => {
    const orderIds = paintings.map((painting) => painting.id).join(",");

    const body: ShippingInfo = {
      shippingRates: totalShippingInfo,
      shippingAddress: shippingAddress,
    };

    try {
      setIsLoading(true);
      const stripePage = await getStripeLink(orderIds, body, headers);
      router.push(stripePage);
      setDataToLocalStorage([]);
    } catch (error: any) {
      if (error?.response?.status === 422) {
        setOrderError(error?.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.asidePanel}>
      <div>
        <p className={style.asidePanel__title}>Order Summary</p>
      </div>
      <div className={style.orderItem}>
        {paintings.map((painting: CartItem) => (
          <Fragment key={painting.id}>
            <div className={style.orderItem__paintingWrapper}>
              <div className={style.orderItem__imageWrapper}>
                <Image
                  className={style.orderItem__image}
                  src={painting.image}
                  alt={`art ${painting.title}`}
                  fill
                  objectFit="cover"
                />
              </div>
              <div className={style.orderItem__paintingInfo}>
                <div className={style.orderItem__paintingInfo__wrapper}>
                  <p className={style.orderItem__title}>{painting.title}</p>
                  <p
                    className={style.orderItem__author}
                  >{`by ${painting.author}`}</p>
                </div>
                <div className={style.orderItem__price}>
                  <p>Price</p>
                  <p>{`${painting.price} €`}</p>
                </div>
              </div>
            </div>
            <hr className={style.line} />
          </Fragment>
        ))}
      </div>
      {totalShippingInfo.length === 0 && (
        <p
          className={style.asidePanel__totalPrice}
        >{`Total: ${totalPrice} €`}</p>
      )}
      {totalShippingInfo.length > 0 && (
        <>
          <p
            className={style.asidePanel__shippingCost}
          >{`Shipping: ${totalShippingInfo[0].totalShippingPrice} €`}</p>

          <p className={style.asidePanel__totalPrice}>{`Total: ${
            totalPrice + totalShippingInfo[0].totalShippingPrice
          } €`}</p>
          <hr className={style.line} />
          <div className={style.saveOrder}>
            <div className={style.saveOrder__secure}>
              <LockIcon />
              <div className={style.saveOrder__info}>
                <p className={style.saveOrder__title}>Safe & Secure Payments</p>
                <p className={style.saveOrder__text}>
                  All payments and transactions are secure
                </p>
              </div>
            </div>
            <div className={style.saveOrder__secure}>
              <SupportIcon />
              <div className={style.saveOrder__info}>
                <p className={style.saveOrder__title}>
                  Support Those Who Most Needed
                </p>
                <p className={style.saveOrder__text}>
                  Almost half price on every sale goes on charity to support
                  people in Ukraine
                </p>
              </div>
            </div>
            <button onClick={handleGetStripeUrl} className={style.button}>
              {isLoading ? (
                <div className={style.buttonLoader}>
                  <span>Loading...</span>
                  <ButtonLoader darkLoader={true} />
                </div>
              ) : (
                <span>Place order</span>
              )}
            </button>
            {orderError && <p className={style.errorInfo}>{orderError}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
