import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ShippingForm from "@/app/account/shipping-form/shippingForm";
import { AccountData, CreatedAccountResponse } from "@/types/Account";

import style from './delivery.module.scss';
import GooglePlacesComponent from "@/app/components/google-places/googlePlacesComponent";
import { OptionDetails, ShippingFormData, ShippingFormTypes, ShippingResponseData } from "@/types/ShippingForm";
import { getAddressPieces } from "@/utils/account";
import { getAccount, getAddress, saveAddress } from "@/utils/api";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthenticator } from "@aws-amplify/ui-react";
import createHeaders from "@/utils/getAccessToken";

const defaultPlaceState = {
  value: { terms: [{value: ''}, {value: ''}]},
  label: '',
  postalCode: '',
  state: '',
  city: '',
};

const Delivery: FC = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const headers = createHeaders(user);

  const [account, setAccount] = useState<AccountData | null>(null);
  const [address, setAddress] = useState<ShippingFormData | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<OptionDetails>(defaultPlaceState);

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
    values: {
      state: address?.state,
      postalCode: address?.postalCode || '',
      addressLine2: address?.addressLine2 || '',
      city: address?.city || getAddressPieces(selectedPlace?.value)[0],
      country: address?.country || getAddressPieces(selectedPlace?.value)[1],
      addressLine1: selectedPlace || defaultPlaceState,
    },
  });

  const fetchData = async () => {
    const fetchedUser: CreatedAccountResponse = await getAccount(headers);
    const fetchedAddress: ShippingResponseData[] = await getAddress(headers)

    const { email, phone, firstName, lastName } = fetchedUser;
    const { addressLine1, addressLine2, city, country, state, postalCode } = fetchedAddress[0];

    setAccount({ email, phone, firstName, lastName });
    setAddress({
      city,
      state,
      country,
      postalCode,
      addressLine2,
      addressLine1: {
        value: '',
        label: addressLine1,
        postalCode: '',
        state: '',
        city: '' },
    });

    setSelectedPlace(prev => ({ ...prev, label: addressLine1 }))
  };

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
  };

  useEffect(() => {
    if (user?.username) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!address) return;

    setValue('city', address?.city)
    setValue('state', address?.state)
    setValue('country', address?.country)
    setValue('postalCode', address?.postalCode);
    setValue('addressLine2', address?.addressLine2)
    setValue('addressLine1.label', address?.addressLine1?.label);
  }, [address]);

  const formValues = shippingControl._defaultValues;

  useEffect(() => {
    if(selectedPlace.label === formValues.addressLine1?.label) return;
    if (
      selectedPlace.state !== formValues.state ||
      selectedPlace.city !== formValues.city ||
      selectedPlace.postalCode !== formValues.postalCode
    ) {
      setValue('state', selectedPlace.state || '');
      setValue('city', selectedPlace.city || '');
      setValue('postalCode', selectedPlace.postalCode || '');
    }
  }, [selectedPlace, setValue, formValues]);
  return (
    <div>
      <div className={style.titleContainer}>
        <div className={style.title}>Address</div>
          <p className={style.subtitle}>
            To sell your paintings you should fill in your shipment address details.
          </p>
      </div>

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
                render={({ field, fieldState }) => (
                  <GooglePlacesComponent
                    field={field}
                    value={selectedPlace}
                    error={fieldState.error}
                    setSelectedPlace={setSelectedPlace}
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
                    type="number"
                    className={style.text}
                    value={selectedPlace.postalCode}
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
            <button type='reset' onClick={onReset} className={style.cancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Delivery;
