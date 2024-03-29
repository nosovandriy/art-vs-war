import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { useAuthenticator } from "@aws-amplify/ui-react";

import style from '../account.module.scss';

import { saveAddress } from "@/utils/api";
import { AccountData } from "@/types/Account";
import createHeaders from "@/utils/getAccessToken";
import { ShippingFormData, ShippingFormTypes } from "@/types/ShippingForm";
import { GoogleAutocompleteAddress } from "@/app/components/google-places/react-google-autocomplete";

type Props = {
  account: AccountData | null;
  address: ShippingFormData | null;
  setIsOpenForm: Dispatch<SetStateAction<boolean>>;
  setAddress: Dispatch<SetStateAction<ShippingFormData | null>>;
}

const ShippingForm: FC<Props> = ({ account, address, setAddress, setIsOpenForm }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const headers = createHeaders(user);

  const {
    control: shippingControl,
    handleSubmit: handleSubmitShipping,
    register: registerShipping,
    formState: { errors: errors2 },
    reset: resetShippingform,
    clearErrors,
    setValue,
  } = useForm<ShippingFormData>({
    mode: "onTouched",
    defaultValues: {
      addressLine1: address?.addressLine1 || '',
      addressLine2: address?.addressLine2 || '',
      city: address?.city || '',
      state: address?.state || '',
      country: address?.country || '',
      postalCode: address?.postalCode || '',
    },
  });

  const handleSaveAddress = async (shippingData: ShippingFormTypes) => {
    await saveAddress(headers, shippingData);
    setIsOpenForm(false);
  }

  const onSubmitShipping = async (data: ShippingFormData) => {
    const shippingDataTosave = account && {
      ...data,
      ...account,
      addressLine1: data.addressLine1,
    };

    shippingDataTosave && await toast.promise(
      handleSaveAddress(shippingDataTosave),
      {
        loading: 'Creating address...',
        success: <b>Address created!</b>,
        error: <b>Could not create.</b>,
      }, {
        style: {
          borderRadius: '10px',
          background: '#1c1d1d',
          color: '#b3b4b5',
        }
      }
    );

    setAddress(data);
  };

  const onReset = () => {
    resetShippingform();

    if (address) {
      setIsOpenForm(false);
    };
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className={style.form}
      onSubmit={handleSubmitShipping(onSubmitShipping)}
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
              control={shippingControl}
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
              defaultValue={''}
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => {
                return (
                  <GoogleAutocompleteAddress
                    value={value}
                    setValue={setValue}
                    onChange={onChange}
                    error={error}
                    clearErrors={clearErrors}
                  />
                )
              }}
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
              {...registerShipping("addressLine2", {
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

        <div className={style.addressContainer}>
          <div className={style.inputsContainer}>
            <label className={style.label}>
              <div>
                Country
                <span className={style.star}>*</span>
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.text} ${errors2?.country?.message && style.text__error}`}
                  placeholder="Choose country"
                  {...registerShipping("country", {
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
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.text} ${errors2?.city?.message && style.text__error}`}
                  placeholder="Enter the city name"
                  {...registerShipping("city", {
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
                  {...registerShipping("state", {
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
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.text} ${errors2?.postalCode?.message && style.text__error}`}
                  placeholder="Enter your postcode"
                  {...registerShipping("postalCode", {
                    required: "This field is required!",
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

          {address && (
            <button type='reset' onClick={onReset} className={style.cancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
)};

export default ShippingForm;
