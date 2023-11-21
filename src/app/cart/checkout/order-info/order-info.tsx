'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ArrowUpIcon } from '@/app/icons/icon-arrow-up';
import { removePaintingFromCart } from '@/app/redux/slices/cartSlice';
import { CreatedAccountResponse } from '@/types/Account';
import { useAppDispatch, useAppSelector } from '@/types/ReduxHooks';
import { ShippingFormTypes, ShippingResponseData } from '@/types/ShippingForm';
import { CartSteps } from '@/types/cartSteps';
import { getAccount, getAddress, removeOrderPaintingFromServer } from '@/utils/api';
import createHeaders from '@/utils/getAccessToken';
import OrderItem from '../../order-item/order-item';
import EmptyCartPage from '../../order-list/empty-cart/empty-cart';
import OrderSummary from './order-summary/order-summary';
import ShippingForm from './shipping-form/shipping-form';

import style from './order-info.module.scss';

const OrderInfo = () => {
  const [activeSection, setActiveSection] = useState<CartSteps | null>(CartSteps.secondStep);
  const [defaultValues, setDefaultValues] = useState<ShippingFormTypes>();

  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAuthenticator((context) => [context.route]);
  const headers = createHeaders(user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRemovePainting = (id: number) => {
    dispatch(removePaintingFromCart(id));

    if (user) {
      removeOrderPaintingFromServer(id, headers);
    }
  };

  const fetchAccountData = async () => {
    const headers = createHeaders(user);
    const fetchedUser: CreatedAccountResponse = await getAccount(headers);
    const fetchedAddress: ShippingResponseData[] = await getAddress(headers);

    const { phone, firstName, lastName } = fetchedUser;
    if (fetchedAddress[0]) {
      const { addressLine1, addressLine2, city, country, state, postalCode } = fetchedAddress[0];

      const accountInfo = {
        firstName,
        lastName,
        country,
        city,
        state,
        postalCode,
        addressLine1,
        addressLine2,
        phone,
      };
      setDefaultValues(accountInfo);
    } else {
      const formDefaultValue: ShippingFormTypes = {
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        state: '',
        postalCode: '',
        addressLine1: '',
        addressLine2: '',
        phone: '',
      };

      setDefaultValues(formDefaultValue);
    }
  };

  useEffect(() => {
    if (paintings.length === 0) {
      router.push('/cart');
    } else {
      fetchAccountData();
    }
  }, []);

  const handleSectionClick = (step: CartSteps | null) => {
    setActiveSection(activeSection === step ? null : step);
  };

  const isVisibleShippingForm = activeSection === CartSteps.secondStep;

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
                  activeSection !== CartSteps.firstStep && `${style.arrow__close}`
                }`}
              >
                <ArrowUpIcon />
              </div>
            </div>
            {activeSection === CartSteps.firstStep && (
              <>
                <OrderItem paintings={paintings} handleRemovePainting={handleRemovePainting} />
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
                  activeSection !== CartSteps.secondStep && `${style.arrow__close}`
                }`}
              >
                <ArrowUpIcon />
              </div>
            </div>
            {defaultValues && (
              <ShippingForm
                headers={headers}
                defaultValues={defaultValues}
                isVisible={isVisibleShippingForm}
                handleSectionClick={handleSectionClick}
              />
            )}
          </div>
          <OrderSummary />
        </div>
      ) : (
        <EmptyCartPage />
      )}
    </>
  );
};

export default OrderInfo;
