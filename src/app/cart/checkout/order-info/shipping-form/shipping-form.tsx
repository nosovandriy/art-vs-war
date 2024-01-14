'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import ButtonLoader from '@/app/components/button-loader/button-loader';
import { GoogleAutocompleteAddress } from '@/app/components/google-places/react-google-autocomplete';
import { setPaintingsShippingInfo, setShippingAddress } from '@/app/redux/slices/shippingSlice';
import { useAppSelector } from '@/types/ReduxHooks';
import { ShippingFormTypes } from '@/types/ShippingForm';
import { CartSteps } from '@/types/cartSteps';
import { getShippingInfo } from '@/utils/api';
import { validation } from './form';
import { PhoneNumber } from './phone-number/phone-number';

import style from './shipping-form.module.scss';

type Props = {
  headers: object;
  isVisible: boolean;
  defaultValues: ShippingFormTypes;
  handleSectionClick: (string: CartSteps | null) => void;
};

const ShippingForm: React.FC<Props> = ({
  headers,
  isVisible,
  handleSectionClick,
  defaultValues,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { paintings } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validation),
    defaultValues,
  });

  const submit: SubmitHandler<ShippingFormTypes> = async (data) => {
    console.log(data);

    if (data && isVisible) {
      handleSectionClick(null);
    }

    const orderIds = paintings.map((painting) => painting.id).join(',');

    try {
      setIsLoading(true);
      const shippingInfo = await getShippingInfo(orderIds, data, headers);

      dispatch(setPaintingsShippingInfo(shippingInfo));
      dispatch(setShippingAddress(data));
    } catch (error: any) {
      console.log('error', error);
      const manualPrice = [
        {
          paintingId: Number(orderIds),
          shippingPrice: 55,
          deliveryMinDays: 3,
          deliveryMaxDays: 5,
        },
      ];
      dispatch(setPaintingsShippingInfo(manualPrice));
      dispatch(setShippingAddress(data));
    } finally {
      setIsLoading(false);
    }
  };

  const error: SubmitErrorHandler<ShippingFormTypes> = async (data) => {
    if (data && !isVisible) {
      handleSectionClick(CartSteps.secondStep);
    }
  };

  const countryWatch = watch('country');
  const cityWatch = watch('city');
  const postalCodeWatch = watch('postalCode');
  const stateWatch = watch('state');

  return (
    <form className={style.form} onSubmit={handleSubmit(submit, error)}>
      {isVisible && (
        <>
          <div className={`${style.coupleInputs}`}>
            <label className={style.label}>
              <p className={style.label__text}>
                First Name<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.firstName?.message && style.inputText__error
                  }`}
                  placeholder="Enter your first name"
                  {...register('firstName')}
                />
                <div className={style.error}>{errors.firstName?.message}</div>
              </div>
            </label>
            <label className={style.label}>
              <p className={style.label__text}>
                Last Name<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.lastName?.message && style.inputText__error
                  }`}
                  placeholder="Enter your last name"
                  {...register('lastName')}
                />
                <div className={style.error}>{errors.lastName?.message}</div>
              </div>
            </label>
          </div>
          <label className={style.label}>
            <p className={style.label__text}>
              Phone number<span className={style.star}> *</span>
            </p>
            <div className={style.input}>
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <PhoneNumber value={value} onChange={onChange} error={error} />
                    {error && <div className={style.error}>{errors.phone?.message}</div>}
                  </>
                )}
              />
            </div>
          </label>
          <label className={style.label}>
            <p className={style.label__text}>
              Address<span className={style.star}> *</span>
            </p>
            <div className={style.input}>
              <Controller
                name="addressLine1"
                control={control}
                rules={{
                  required: 'This is a required field',
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => {
                  return (
                    <GoogleAutocompleteAddress
                      setValue={setValue}
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  );
                }}
              />
              {errors?.addressLine1?.message && (
                <div className={style.error}>{errors.addressLine1?.message}</div>
              )}
              <input
                type="text"
                className={style.inputText}
                placeholder="Enter your street, apartment, №..."
                {...register('addressLine2')}
              />
            </div>
          </label>
          <div className={`${style.label} ${style.coupleInputs}`}>
            <label className={style.label}>
              <p className={style.label__text}>
                Country<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.country?.message && !countryWatch && style.inputText__error
                  }`}
                  placeholder="Enter the country"
                  {...register('country')}
                />
                {!countryWatch && <div className={style.error}>{errors.country?.message}</div>}
              </div>
            </label>
            <label className={style.label}>
              <p className={style.label__text}>State / Region</p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.state?.message && !stateWatch && style.inputText__error
                  }`}
                  placeholder="Enter state/region name"
                  {...register('state')}
                />
                {!stateWatch && <div className={style.error}>{errors.state?.message}</div>}
              </div>
            </label>
          </div>
          <div className={`${style.label} ${style.coupleInputs}`}>
            <label className={style.label}>
              <p className={style.label__text}>
                City<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.city?.message && !cityWatch && style.inputText__error
                  }`}
                  placeholder="Enter the city name"
                  {...register('city')}
                />
                {!cityWatch && <div className={style.error}>{errors.city?.message}</div>}
              </div>
            </label>
            <label className={style.label}>
              <p className={style.label__text}>
                Postcode<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.postalCode?.message && !postalCodeWatch && style.inputText__error
                  }`}
                  placeholder="Enter your postcode"
                  {...register('postalCode')}
                />
                {!postalCodeWatch && (
                  <div className={style.error}>{errors.postalCode?.message}</div>
                )}
              </div>
            </label>
          </div>
        </>
      )}

      <button type="submit" className={style.button}>
        {isLoading ? (
          <div className={style.buttonLoader}>
            <span>Calculating...</span>
            <ButtonLoader />
          </div>
        ) : (
          <span>Calculate shipping cost</span>
        )}
      </button>
    </form>
  );
};

export default ShippingForm;
