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
  label: '',
  postalCode: '',
  value: { terms: [{value: ''}, {value: ''}]},
};

type Props = {
  account: AccountData | null;
  address: ShippingFormData | null;
  setIsOpenForm: Dispatch<SetStateAction<boolean>>;
  setAccount: Dispatch<SetStateAction<AccountData | null>> | null;
}

const ShippingForm: FC<Props> = ({ account, address, setIsOpenForm }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const headers = createHeaders(user);
  // const [isOpenForm, setIsOpenForm] = useState(false);

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
    // defaultValues: {
    //   addressLine1: defaultPlaceState,
    //   addressLine2: '',
    //   city: '',
    //   state: '',
    //   country: '',
    //   postalCode: '',
    // },
  });

  const watchAddress = watch('addressLine1');

  const handleSaveAddress = async (shippingData: ShippingFormTypes) => {
    await saveAddress(headers, shippingData);
  }

  const onSubmitShipping = (data: ShippingFormData) => {
    const shippingDataTosave = account && {
      ...data,
      ...account,
      addressLine1: data.addressLine1.label,
    };

    shippingDataTosave && toast.promise(
      handleSaveAddress(shippingDataTosave),
      {
        loading: 'Creating account...',
        success: <b>Account created!</b>,
        error: <b>Could not create.</b>,
      }, {
        style: {
          borderRadius: '10px',
          background: '#1c1d1d',
          color: '#b3b4b5',
        }
      }
    )
  };

  const onReset = () => {
    resetShippingform();
    setIsOpenForm(false);
  };

  useEffect(() => {
    if (!address) return;

    setValue('city', address.city)
    setValue('state', address.state)
    setValue('country', address.country)
    setValue('postalCode', address.postalCode);
    setValue('addressLine2', address.addressLine2)
    setValue('addressLine1', { ...watchAddress, label: address.addressLine1.label });
  }, [address]);

  useEffect(() => {
    const formValues = shippingControl._defaultValues;

    if(watchAddress?.label === formValues?.addressLine1?.label) return;

    if (
      watchAddress.city !== formValues.city ||
      watchAddress.state !== formValues.state ||
      watchAddress.country !== formValues.country ||
      watchAddress.postalCode !== formValues.postalCode
    ) {
      setValue('city', watchAddress.city);
      setValue('state', watchAddress.state);
      setValue('country', watchAddress.country)
      setValue('postalCode', watchAddress.postalCode);
    }
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
              render={({ field: { value, onChange, onBlur}, fieldState: { error } }) => (
                <GooglePlacesComponent
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={error}
                />
              )}
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
              className={style.text}
              placeholder="Enter your address"
              {...registerShipping("addressLine2")}
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
                  className={style.text}
                  placeholder="Choose country"
                  {...registerShipping("country", { required: 'This field is required!' })}
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
                  className={style.text}
                  placeholder="Enter state/region name"
                  {...registerShipping("state")}
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
                  className={style.text}
                  placeholder="Enter the city name"
                  {...registerShipping("city", { required: 'This field is required!' })}
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
                  className={style.text}

                  placeholder="Enter your postcode"
                  {...registerShipping("postalCode", { required: 'This field is required!' })}
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
            <button type='reset' onClick={onReset} className={style.cancel}>Cancel</button>
          )}
        </div>
      </div>
    </form>
)};

export default ShippingForm;
