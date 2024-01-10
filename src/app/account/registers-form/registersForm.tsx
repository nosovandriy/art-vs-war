import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import jwt_decode from 'jwt-decode';
import { useForm, Controller } from "react-hook-form";
import { useAuthenticator } from "@aws-amplify/ui-react";

import './registers.scss';
import style from '../account.module.scss';

import { createAccount, updateAccount } from "@/utils/api";
import { CustomJwtPayload } from "@/types/Profile";
import createHeaders from "@/utils/getAccessToken";
import { refreshAccessToken } from "@/utils/profile";
import { AccountData, AccountFormData } from "@/types/Account";
import { PhoneNumber } from "@/app/cart/checkout/order-info/shipping-form/phone-number/phone-number";

type Props = {
  account: AccountData | null;
  setIsOpenForm: Dispatch<SetStateAction<boolean>>;
  setAccount: Dispatch<SetStateAction<AccountData | null>>;
}

const RegistersForm: FC<Props> = ({ account, setAccount, setIsOpenForm }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const idToken = user.getSignInUserSession()?.getIdToken().getJwtToken();
  const refreshToken = user.getSignInUserSession()?.getRefreshToken();
  const decoded = idToken ? (jwt_decode(idToken) as CustomJwtPayload) : '';
  const userEmail = decoded && decoded.email;
  const headers = createHeaders(user);

  const {
    control: accountControl,
    handleSubmit: handleSubmitAccount,
    register: registerAccount,
    formState: { errors: errors1 },
    reset: resetAccountForm,
  } = useForm<AccountFormData>({
    mode: "onTouched",
    values: {
      firstName: account?.firstName || '',
      lastName: account?.lastName || '',
      phone: account?.phone || '',
    }
  });

  const handleCreateAccount = async (userData: AccountData) => {
    const createdUser: AccountData = await createAccount(headers, userData,);

    const dataToSave: AccountData = {
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phone: createdUser.phone,
    }

    setAccount(dataToSave);
    refreshAccessToken(refreshToken, user);
  }

  const handleUpdateAccount = async (userData: AccountData) => {
    const updatedUser: AccountData = await updateAccount(headers, userData,);

    const dataToSave: AccountData = {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
    }

    setAccount(dataToSave);
  }

  const onSubmitAccount = (data: AccountFormData) => {
    const dataToSave: AccountData = {
      ...data,
      email: userEmail,
    }

    toast.promise(
      account ? handleUpdateAccount(dataToSave) : handleCreateAccount(dataToSave),
      {
        loading: `${account ? 'Updating' : 'Creating'} account...`,
        success: <b>{`Account ${account ? 'updated!' : 'created!'}`}</b>,
        error: <b>{`Could not ${account ? 'update.' :'create.'}`}</b>,
      }, {
        style: {
          borderRadius: '10px',
          background: '#1c1d1d',
          color: '#b3b4b5',
        }
      }
    );

    setIsOpenForm(false);
  };

  const onReset = () => {
    resetAccountForm();
    setIsOpenForm(false);
  }

  return (
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
              className={`${style.text} ${errors1?.firstName?.message && style.text__error}`}
              placeholder="Enter your first name"
              {...registerAccount("firstName", {
                required: 'This field is required!',
                maxLength: {
                  value: 30,
                  message: 'The first name input is too long, max 30 characters',
                },
                pattern: {
                  value: /^[A-Za-z\s'-]+$/,
                  message: "Should contain only Latin letters, space, ' and -",
                },
              })}
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
              className={`${style.text} ${errors1?.lastName?.message && style.text__error}`}
              placeholder="Enter your last name"
              {...registerAccount("lastName", {
                required: 'This field is required!',
                maxLength: {
                  value: 30,
                  message: 'The last name input is too long, max 30 characters',
                },
                pattern: {
                  value: /^[A-Za-z\s'-]+$/,
                  message: "Should contain only Latin letters, space, ' and -",
                },
              })}
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
              rules={{
                required: 'This field is required!',
                pattern: {
                  value: /^[0-9\s()+]+$/,
                  message: 'Should contain only digits, space, (, ), +',
                },
                minLength: {
                  value: 7,
                  message: 'Must be at least 7 characters',
                },
                maxLength: {
                  value: 30,
                  message: 'Must be at most 30 characters',
                },
              }}
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
          <button type='submit' className={style.submit}>{account ? 'Update' : 'Submit'}</button>

          {account && (
            <button type='reset' onClick={onReset} className={style.cancel}>Cancel</button>
          )}
        </div>
      </div>
    </form>
  )
};

export default RegistersForm;
