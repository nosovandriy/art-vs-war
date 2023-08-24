"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { ArrowUpIcon } from "@/app/icons/icon-arrow-up";
import { removePaintingFromCart } from "@/app/redux/slices/cartSlice";
import { CartItem } from "@/types/CartItem";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { CartSteps } from "@/types/cartSteps";
import { getStripeLink, removeOrderPaintingFromServer } from "@/utils/api";
import createHeaders from "@/utils/getAccessToken";
import OrderItem from "../../order-item/order-item";
import EmptyCartPage from "../../order-list/empty-cart/empty-cart";
import ShippingForm from "./shipping-form/shipping-form";
import { LockIcon } from "@/app/icons/icon-lock";
import { SupportIcon } from "@/app/icons/icon-support";

import style from "./order-info.module.scss";
import { ShippingInfo } from "@/types/ShippingForm";

const OrderInfo = () => {
  const [activeSection, setActiveSection] = useState<CartSteps | null>(
    CartSteps.secondStep
  );
  const [orderError, setOrderError] = useState("");

  const dispatch = useAppDispatch();
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const { totalShippingInfo, shippingAddress } = useAppSelector(
    (state) => state.shipping
  );
  const { user } = useAuthenticator((context) => [context.route]);
  const headers = createHeaders(user);
  const router = useRouter();

  const handleRemovePainting = (id: number) => {
    dispatch(removePaintingFromCart(id));

    if (user) {
      removeOrderPaintingFromServer(id, headers);
    }
  };

  useEffect(() => {
    if (paintings.length === 0) {
      router.push("/cart");
    }
  }, [paintings, router]);

  const handleSectionClick = (step: CartSteps | null) => {
    setActiveSection(activeSection === step ? null : step);
  };

  const isVisibleShippingForm = activeSection === CartSteps.secondStep;

  const handleGetStripeUrl = async () => {
    const orderIds = paintings.map((painting) => painting.id).join(",");

    const body: ShippingInfo = {
      shippingRates: totalShippingInfo,
      shippingAddress: shippingAddress,
    };

    try {
      const stripePage = await getStripeLink(orderIds, body, headers);
      router.push(stripePage);
    } catch (error: any) {
      if (error?.response?.status === 422) {
        setOrderError(error?.response?.data.message);
      }
    }
  };

  return (
    <>
      {paintings.length > 0 && totalPrice > 0 ? (
        <div className={style.wrapper}>
          <div className={style.orderInfo}>
            <div
              className={style.headerStep}
              onClick={() => handleSectionClick(CartSteps.firstStep)}
            >
              <p>In my Cart</p>
              <div
                className={`${style.arrow} ${
                  activeSection !== CartSteps.firstStep &&
                  `${style.arrow__close}`
                }`}
              >
                <ArrowUpIcon />
              </div>
            </div>
            {activeSection === CartSteps.firstStep && (
              <>
                <OrderItem
                  paintings={paintings}
                  handleRemovePainting={handleRemovePainting}
                />
                <div className={style.totalInfo}>
                  <p className={style.totalPrice}>{`Total: ${totalPrice} €`}</p>
                </div>
              </>
            )}
            <div
              className={style.headerStep}
              onClick={() => handleSectionClick(CartSteps.secondStep)}
            >
              <p className={style.headerStep__text}>Shipping Address</p>
              <div
                className={`${style.arrow} ${
                  activeSection !== CartSteps.secondStep &&
                  `${style.arrow__close}`
                }`}
              >
                <ArrowUpIcon />
              </div>
            </div>
            <ShippingForm
              headers={headers}
              isVisible={isVisibleShippingForm}
              handleSectionClick={handleSectionClick}
            />
          </div>
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
                        <p className={style.orderItem__title}>
                          {painting.title}
                        </p>
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
                      <p className={style.saveOrder__title}>
                        Safe & Secure Payments
                      </p>
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
                        Almost half price on every sale goes on charity to
                        support people in Ukraine
                      </p>
                    </div>
                  </div>
                  <button onClick={handleGetStripeUrl} className={style.button}>
                    Place order
                  </button>
                  {orderError && (
                    <p className={style.errorInfo}>{orderError}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <EmptyCartPage />
      )}
    </>
  );
};

export default OrderInfo;
