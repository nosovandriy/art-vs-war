import { FC, useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";

import style from './delivery.module.scss'

import {
  AuthorShippingFormData,
  AuthorShippingResponseData,
} from "@/types/ShippingForm";
import createHeaders from "@/utils/getAccessToken";
import { getShippingAddress } from "@/utils/api";
import DeliveryForm from "./deliveryForm";
import DeliveryData from "./deliveryData.";
import Loading from "@/app/loading";

const Delivery: FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const headers = createHeaders(user);

  const [address, setAddress] = useState<AuthorShippingFormData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(true);

  const fetchData = async () => {
    try {
      const fetchedAddress: AuthorShippingResponseData = await getShippingAddress(headers)

      if (fetchedAddress) {
        setAddress({ ...fetchedAddress, country: fetchedAddress?.authorCountry });
        setIsOpenForm(false);
      }
    } catch (error) {
      console.log('address error:', error)
    } finally {
      setIsFetching(false);
    };
  };

  useEffect(() => {
    if (user?.username) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <div className={style.titleContainer}>
        <div className={style.title}>Address</div>
          {(!address && !isFetching) && (
            <p className={style.subtitle}>
              To sell your paintings you should fill in your shipment address details.
            </p>
          )}
      </div>

      {isFetching && (
        <Loading className={style.loading} />
      )}

      {(isOpenForm && !isFetching) ? (
          <DeliveryForm address={address} setIsOpenForm={setIsOpenForm} />
        ) : (
          <DeliveryData address={address} setIsOpenForm={setIsOpenForm} />
        )}
    </div>
  );

};

export default Delivery;
