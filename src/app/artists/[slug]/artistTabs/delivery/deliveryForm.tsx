import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuthenticator } from "@aws-amplify/ui-react";
import toast from "react-hot-toast";

import style from './delivery.module.scss';

import createHeaders from "@/utils/getAccessToken";
import { AuthorShippingFormData } from "@/types/ShippingForm";
import { saveShippingAddress, updateShippingAddress } from "@/utils/api";
import { PhoneNumber } from "@/app/cart/checkout/order-info/shipping-form/phone-number/phone-number";
import { GoogleAutocompleteAddress } from "@/app/components/google-places/react-google-autocomplete";

type Props = {
  address: AuthorShippingFormData | null;
  setIsOpenForm: Dispatch<SetStateAction<boolean>>;
  setAddress: Dispatch<SetStateAction<AuthorShippingFormData | null>>;
}

const DeliveryForm: FC<Props> = ({ address, setAddress, setIsOpenForm }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const headers = createHeaders(user);

  const {
    reset,
    control,
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors: errors2 },
  } = useForm<AuthorShippingFormData>({
    mode: "onTouched",
    defaultValues: {
      city: '',
      state: '',
      phone: '',
      country: '',
      postalCode: '',
      addressLine1: '',
      addressLine2: '',
    },
  });

  const handleSaveAddress = async (shippingData: AuthorShippingFormData) => {
    await saveShippingAddress(headers, shippingData);
    setAddress(shippingData);
  };

  const handleUpdateAddress = async (shippingData: AuthorShippingFormData) => {
    await updateShippingAddress(headers, shippingData);
    setAddress(shippingData);
  };

  const onSubmitShipping = (data: AuthorShippingFormData) => {
    const shippingDataTosave = {
      ...data,
      addressLine1: data.addressLine1,
    };

    shippingDataTosave && toast.promise(
      address
        ? handleUpdateAddress(shippingDataTosave)
        : handleSaveAddress(shippingDataTosave),
      {
        loading: address ? 'Updating address...' : 'Creating address...',
        success: address ? <b>Address updated!</b> : <b>Address created!</b>,
        error: address ? <b>Could not udpate.</b> : <b>Could not create.</b>,
      }, {
        style: {
          borderRadius: '10px',
          background: '#1c1d1d',
          color: '#b3b4b5',
        }
      }
    )

    setIsOpenForm(false);
  };

  const onReset = () => {
    reset();
    setIsOpenForm(false);
  };

  useEffect(() => {
    if (!address) return;

    const {
      city,
      state,
      phone,
      country,
      postalCode,
      authorCountry,
      addressLine1,
      addressLine2,
    } = address;

      setValue('city', city)
      setValue('state', state)
      setValue('phone', phone)
      setValue('country', country)
      setValue('postalCode', postalCode);
      setValue('addressLine2', addressLine2)
      setValue('addressLine1', addressLine1);
  }, [address]);

  return (
    <form
      noValidate
      autoComplete="off"
      className={style.form}
      onSubmit={handleSubmit(onSubmitShipping)}
    >
      <div className={style.container}>
        <div className={`${style.label} ${style.address}`}>
          <div>
            Address
            <span className={style.star}>*</span>
          </div>

          <div className={style.input}>
            <Controller
              name="addressLine1"
              control={control}
              rules={{
                required: "This is a required field",
                validate: (value) => {
                  if (!value?.length) {
                    return "This is a required field";
                  }

                  if (value.length > 150) {
                    return "Max length 150";
                  }

                  return true;
                }
              }}
              render={({
                field: { value, onChange},
                fieldState: { error },
              }) => (
                <GoogleAutocompleteAddress
                  value={value}
                  setValue={setValue}
                  onChange={onChange}
                  error={error}
                  clearErrors={clearErrors}
                />
              )}
            />

            {typeof errors2?.addressLine1?.message === 'string' && (
              <div className={style.error}>{errors2.addressLine1.message}</div>
            )}
          </div>
        </div>

        <label className={style.label}>
          <div>
            Address 2
          </div>

          <div className={style.input}>
            <input
              type="text"
              className={`${style.text} ${errors2?.addressLine2?.message && style.text__error}`}
              placeholder="Enter your address"
              {...register("addressLine2", {
                maxLength: {
                  value: 40,
                  message: "Must be at most 40 characters",
                },
                pattern: {
                  value: /^[^\u0400-\u04FF]*$/,
                  message: 'Only Latin letters are allowed',
                },
              })}
            />
            {typeof errors2?.addressLine2?.message === 'string' && (
              <div className={style.error}>{errors2.addressLine2.message}</div>
            )}
          </div>
        </label>

        <label className={style.label}>
        <div>
          Phone number
          <span className={style.star}>*</span>
        </div>
        <div className={style.input}>
          <Controller
            control={control}
            name="phone"
            rules={{ required: "This field is required!" }}
            render={({
              field: { onChange, value },
            }) => (
              <>
                <PhoneNumber value={value} onChange={onChange} error={errors2?.phone} />
                {typeof errors2?.phone?.message === 'string' && (
                  <div className={style.error}>{errors2?.phone.message}</div>
                )}
              </>
            )}
          />
        </div>
      </label>

        <div className={style.addressContainer}>
          <div className={style.inputsContainer}>
            <label className={style.label}>
              <div>
                Country
                <span className={style.star}>*</span>
              </div>
              <div className={`${style.input} ${errors2?.country ? style.inputError : ""}`}>
                <input
                  type="text"
                  className={`${style.text} ${errors2?.country?.message && style.text__error}`}
                  placeholder="Choose country"
                  {...register("country", {
                    required: "This field is required!",
                    maxLength: {
                      value: 56,
                      message: "Must be at most 56 characters",
                    },
                    pattern: {
                      value: /^[^\u0400-\u04FF]*$/,
                      message: 'Only Latin letters are allowed',
                    },
                  })}
                />
                {typeof errors2?.country?.message === 'string' && (
                  <div className={style.error}>{errors2.country.message}</div>
                )}
              </div>
            </label>

            <label className={style.label}>
              <div>
                City
                <span className={style.star}>*</span>
              </div>
              <div className={`${style.input} ${errors2?.city ? style.inputError : ""}`}>
                <input
                  type="text"
                  className={`${style.text} ${errors2?.city?.message && style.text__error}`}
                  placeholder="Enter the city name"
                  {...register("city", {
                    required: "This field is required!",
                    maxLength: {
                      value: 40,
                      message: "Must be at most 40 characters",
                    },
                    pattern: {
                      value: /^[^\u0400-\u04FF]*$/,
                      message: 'Only Latin letters are allowed',
                    },
                  })}
                />
                {typeof errors2?.city?.message === 'string' && (
                  <div className={style.error}>{errors2.city.message}</div>
                )}
              </div>
            </label>
          </div>

          <div className={style.inputsContainer}>
            <label className={style.label}>
              <div>
                State / Region
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.text} ${errors2?.state?.message && style.text__error}`}
                  placeholder="Enter state/region name"
                  {...register("state", {
                    maxLength: {
                      value: 50,
                      message: "Must be at most 50 characters",
                    },
                    pattern: {
                      value: /^[^\u0400-\u04FF]*$/,
                      message: 'Only Latin letters are allowed',
                    },
                  })}
                />
                {typeof errors2?.state?.message === 'string' && (
                  <div className={style.error}>{errors2.state.message}</div>
                )}
              </div>
            </label>

            <label className={style.label}>
              <div>
                Postcode
                <span className={style.star}>*</span>
              </div>
              <div className={`${style.input} ${errors2?.postalCode ? style.inputError : ""}`}>
                <input
                  type="text"
                  className={`${style.text} ${errors2?.postalCode?.message && style.text__error}`}
                  placeholder="Enter your postcode"
                  {...register("postalCode", {
                    required: 'This field is required!',
                    minLength: {
                      value: 4,
                      message: "Must be at least 4 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Must be at most 10 characters",
                    },
                  })}
                />
                {typeof errors2?.postalCode?.message === 'string' && (
                  <div className={style.error}>{errors2.postalCode.message}</div>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className={style.buttonContainer}>
          <button type='submit' className={style.submit}>Submit</button>
          <button type='reset' onClick={onReset} className={style.cancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default DeliveryForm;
