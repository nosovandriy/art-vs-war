import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { useAuthenticator } from "@aws-amplify/ui-react";

import style from '../account.module.scss';

import { saveAddress } from "@/utils/api";
import { AccountData } from "@/types/Account";
import createHeaders from "@/utils/getAccessToken";
import { ShippingFormData, ShippingFormTypes } from "@/types/ShippingForm";
import GooglePlacesComponent from "@/app/components/google-places/googlePlacesComponent";

const defaultPlaceState = {
  city: '',
  state: '',
  label: 'Enter your address',
  postalCode: '',
  value: { terms: [{value: ''}, {value: ''}]},
};

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
    setValue,
    watch,
  } = useForm<ShippingFormData>({
    mode: "onTouched",
    defaultValues: {
      addressLine1: address?.addressLine1 || defaultPlaceState,
      addressLine2: address?.addressLine2 || '',
      city: address?.city || '',
      state: address?.state || '',
      country: address?.country || '',
      postalCode: address?.postalCode || '',
    },
  });

  const watchAddress = watch('addressLine1');

  const handleSaveAddress = async (shippingData: ShippingFormTypes) => {
    await saveAddress(headers, shippingData);
    setIsOpenForm(false);
  }

  const onSubmitShipping = async (data: ShippingFormData) => {
    const shippingDataTosave = account && {
      ...data,
      ...account,
      addressLine1: data.addressLine1.label,
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

  useEffect(() => {
    if(!watchAddress?.city) return;

    setValue('city', watchAddress.city);
    setValue('state', watchAddress.state);
    setValue('country', watchAddress.country);
    setValue('postalCode', watchAddress.postalCode);
  }, [watchAddress]);

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
                required: "This is a required field"
              }}
              defaultValue={null}
              render={({
                field: { value, onChange, onBlur},
                fieldState: { error }
              }) => {
                return (
                  <GooglePlacesComponent
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={error}
                  />
                )
              }}
            />
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
                pattern: {
                  value: /^[A-Za-z0-9\s/'-]+$/,
                  message: "Should contain only Latin letters, digits, spaces, /, -, '",
                },
                maxLength: {
                  value: 40,
                  message: "Must be at most 40 characters",
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
                    minLength: {
                      value: 1,
                      message: "Must be at least 1 character",
                    },
                    maxLength: {
                      value: 56,
                      message: "Must be at most 56 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s/'-]+$/,
                      message: "Should contain only Latin letters, space, /, -, '",
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
                State / Region
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.text} ${errors2?.state?.message && style.text__error}`}
                  placeholder="Enter state/region name"
                  {...registerShipping("state", {
                    minLength: {
                      value: 1,
                      message: "Must be at least 1 character",
                    },
                    maxLength: {
                      value: 50,
                      message: "Must be at most 50 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s/'-]+$/,
                      message: "Should contain only Latin letters, space, /, -, '",
                    },
                  })}
                />
                {typeof errors2?.state?.message === 'string' && (
                  <div className={style.error}>{errors2.state.message}</div>
                )}
              </div>
            </label>
          </div>

          <div className={style.inputsContainer}>
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
                    minLength: {
                      value: 1,
                      message: "Must be at least 1 character",
                    },
                    maxLength: {
                      value: 40,
                      message: "Must be at most 56 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s/'-]+$/,
                      message: "Should contain only Latin letters, space, /, -, '",
                    },
                  })}
                />
                {typeof errors2?.city?.message === 'string' && (
                  <div className={style.error}>{errors2.city.message}</div>
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
                    pattern: {
                      value: /^[A-Za-z0-9\s-]+$/,
                      message: "Should contain only Latin letters, digits, space, -",
                    },
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
