import { Dispatch, FC, SetStateAction } from 'react';

import style from './delivery.module.scss'

import { AuthorShippingFormData } from '@/types/ShippingForm';
import PhoneInput from 'react-phone-input-2';

type Props = {
  address: AuthorShippingFormData | null;
  setIsOpenForm: Dispatch<SetStateAction<boolean>>;
}

const DeliveryData: FC<Props> = ({ address, setIsOpenForm }) => {
  if (!address) {
    setIsOpenForm(true);

    return null;
  };

  const { addressLine1, addressLine2, city, country, state, postalCode, phone } = address;

  return (
    <div className={style.form}>
      <div className={style.container}>
        <div className={style.dataContainer}>
          <div>Address</div>
          <div className={style.input}>
            <div className={style.inputData}>{addressLine1}</div>
          </div>

          {!!addressLine2?.length && (
            <div className={style.input}>
              <div className={style.inputData}>{addressLine2}</div>
            </div>
          )}
        </div>

        <div className={style.dataContainer}>
          <div>Phone number</div>
          <div className={style.input}>
            <PhoneInput
              value={phone}
              excludeCountries={["ru", "by"]}
              country={"ua"}
              disabled
              disableDropdown
              containerClass={style.containerPhone}
              buttonClass={style.buttonPhone}
              inputClass={style.inputPhone}
            />
          </div>
        </div>

        <div className={style.addressContainer}>
          <div className={style.inputsContainer}>
            <div className={style.dataContainer}>
              <div>Country</div>
              <div className={style.input}>
                <div className={style.inputData}>
                  {country}
                </div>
              </div>
            </div>

            <div className={style.dataContainer}>
              <div>City</div>
              <div className={style.input}>
                <div className={style.inputData}>
                  {city}
                </div>
              </div>
            </div>
          </div>

          <div className={style.inputsContainer}>
            {!!state?.length && (
              <div className={style.dataContainer}>
                <div>State / Region</div>
                <div className={style.input}>
                  <div className={style.inputData}>
                    {state}
                  </div>
                </div>
              </div>
            )}

            <div className={style.dataContainer}>
              <div>Postcode</div>
              <div className={style.input}>
                <div className={style.inputData}>
                  {postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.buttonContainer}>
          <button
            type='button'
            className={style.submit}
            onClick={() => setIsOpenForm(true)}
          >
            Edit address
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryData;
