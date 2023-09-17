"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Option } from 'react-google-places-autocomplete/build/types';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import jwt_decode from 'jwt-decode';

import style from './accout.module.scss';

import GooglePlacesComponent from '../components/google-places/googlePlacesComponent';
import { PhoneNumber } from '../cart/checkout/order-info/shipping-form/phone-number/phone-number';
import { ArrowLeft } from '../icons/icon-arrow-left';
import { ArrowDownIcon } from '../icons/iconArrowUp/icon-arrow-down';
import { AccountData, AccountFormData } from '@/types/Account';
import { ShippingFormData, ShippingFormTypes } from '@/types/ShippingForm';
import { CustomJwtPayload } from '@/types/Profile';
import { getAddressPieces } from '@/utils/account';
import createHeaders from '@/utils/getAccessToken';
import toast from 'react-hot-toast';
import { createAccount, saveAddress } from '@/utils/api';
import { refreshAccessToken } from '@/utils/profile';

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

const Account = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const idToken = user.getSignInUserSession()?.getIdToken().getJwtToken();
  const refreshToken = user.getSignInUserSession()?.getRefreshToken();
  const decoded = idToken ? (jwt_decode(idToken) as CustomJwtPayload) : '';
  const userEmail = decoded && decoded.email;
  const headers = createHeaders(user);
  const router = useRouter();

  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Option>({
    value: { terms: [{value: ''}, {value: ''}]},
    label: 'Enter you adress (street, building)',
  });

  const {
    control: accountControl,
    handleSubmit: handleSubmitAccount,
    register: registerAccount,
    formState: { errors: errors1 },
  } = useForm<AccountFormData>({
    mode: "onBlur",
    values: {
      firstName: '',
      lastName: '',
      phone: '',
    }
  });

  const {
    control: shippingControl,
    handleSubmit: handleSubmitShipping,
    register: registerShipping,
    formState: { errors: errors2 },
  } = useForm<ShippingFormData>({
    mode: "onBlur",
    values: {
      addressLine1: selectedPlace,
      addressLine2: '',
      city: getAddressPieces(selectedPlace.value)[0],
      state: '',
      country: getAddressPieces(selectedPlace.value)[1],
      postalCode: '',
    },
  });

  const handleCreateAccount = async (userData: AccountData) => {
    const createdUser: AccountData = await createAccount(headers, userData,);

    const dataToSave: AccountData = {
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phone: createdUser.phone,
    }

    setAccountData(dataToSave);
    refreshAccessToken(refreshToken, user);
    console.log ('response', createdUser)
  }

  const handleSaveAddress = async (shippingData: ShippingFormTypes) => {
    const savedAddress = await saveAddress(headers, shippingData);

    console.log ('response', savedAddress)
  }

  const onSubmitAccount = (data: AccountFormData) => {
    const dataToSave: AccountData = {
      ...data,
      email: userEmail,
    }

    toast.promise(
      handleCreateAccount(dataToSave),
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

    console.log('dataToSave', dataToSave);
  };

  const onSubmitShipping = (data: ShippingFormData) => {
    const shippingDataTosave = accountData && {
      ...data,
      ...accountData,
      addressLine1: data.addressLine1.label,
    };

    console.log('shipping', shippingDataTosave);


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

  return (
    <section className={style.account}>
      <div className={style.titleContainer}>
        <button
          type="button"
          className={style.arrow}
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>

        <h2 className={style.title}>
          Account
        </h2>
      </div>

      <div className={style.subtitle}>
        Already have an account?
        <span className={style.login}>Log in</span>
      </div>

      <form
        noValidate
        autoComplete="off"
        className={style.form}
        onSubmit={handleSubmitAccount(onSubmitAccount)}
      >
        <div className={style.container}>
          <label className={style.label}>
            <div>
              First Name
              <span className={style.star}>*</span>
            </div>
            <div className={style.input}>
              <input
                type="text"
                className={style.text}
                placeholder="Enter your first name"
                {...registerAccount("firstName", { required: 'This field is required!' })}
              />
              {typeof errors1?.firstName?.message === 'string' && (
                <div className={style.error}>{errors1.firstName.message}</div>
              )}
            </div>
          </label>

          <label className={style.label}>
            <div>
              Last Name
              <span className={style.star}>*</span>
            </div>
            <div className={style.input}>
              <input
                type="text"
                className={style.text}
                placeholder="Enter your last name"
                {...registerAccount("lastName", { required: 'This field is required!' })}
              />
              {typeof errors1?.lastName?.message === 'string' && (
                <div className={style.error}>{errors1.lastName.message}</div>
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
                control={accountControl}
                name="phone"
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <PhoneNumber value={value} onChange={onChange} error={error} />
                    {typeof errors1?.phone?.message === 'string' && (
                      <div className={style.error}>{errors1.phone.message}</div>
                    )}
                  </>
                )}
              />
            </div>
          </label>

          <div className={style.buttonContainer}>
            <button type='submit' className={style.submit}>Submit</button>
            <button type='submit' className={style.cancel}>Cancel</button>
          </div>
        </div>
      </form>

      <Accordion>
        <AccordionItem
          key="Shipping Address"
          aria-label="Shipping Address"
          title="Shipping Address"
          classNames={accordionStyles}
          indicator={<ArrowDownIcon isRotated={isOpened} />}
          onPressStart={() => setIsOpened(current => !current)}
        >
          <form
            noValidate
            autoComplete="off"
            className={style.form}
            onSubmit={handleSubmitShipping(onSubmitShipping)}
          >
            <div className={style.container}>
              <div className={`${style.label} ${style.address}`}>
                <div>
                  Adress
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
                  Addres
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
                    placeholder="Enter your postcode"
                    {...registerShipping("postalCode", { required: 'This field is required!' })}
                  />
                  {typeof errors2?.postalCode?.message === 'string' && (
                    <div className={style.error}>{errors2.postalCode.message}</div>
                  )}
                </div>
              </label>

              <div className={style.buttonContainer}>
                <button type='submit' className={style.submit}>Submit</button>
                <button type='submit' className={style.cancel}>Cancel</button>
              </div>
            </div>
          </form>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

const AccountPage = () => (
  <Authenticator>
    <Account/>
  </Authenticator>
)

export default AccountPage;
