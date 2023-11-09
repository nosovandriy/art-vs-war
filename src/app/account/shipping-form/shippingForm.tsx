import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Accordion, AccordionItem } from "@nextui-org/react";

import style from '../account.module.scss';

import ShippingData from "./shippingData";
import { saveAddress } from "@/utils/api";
import { AccountData } from "@/types/Account";
import { getAddressPieces } from "@/utils/account";
import createHeaders from "@/utils/getAccessToken";
import { ArrowDownIcon } from "@/app/icons/iconArrowUp/icon-arrow-down";
import { OptionDetails, ShippingFormData, ShippingFormTypes } from "@/types/ShippingForm";
import GooglePlacesComponent from "@/app/components/google-places/googlePlacesComponent";

type Props = {
  account: AccountData | null;
  address: ShippingFormData | null;
  setAccount: Dispatch<SetStateAction<AccountData | null>> | null;
}

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

const ShippingForm: FC<Props> = ({ account, address }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const headers = createHeaders(user);
  const [isOpenForm, setIsOpenForm] = useState(false);
  // const [selectedPlace, setSelectedPlace] = useState<OptionDetails>({
  //   value: { terms: [{value: ''}, {value: ''}]},
  //   label: address?.addressLine1?.label || 'Enter you adress (street, building)',
  //   postalCode: address?.postalCode || '',
  //   state: address?.state || '',
  //   city: address?.city || '',
  // });

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
      state: address?.state || '',
      postalCode: address?.postalCode || '',
      addressLine2: address?.addressLine2 || '',
      city: address?.city || '',
      country: address?.country || '',
      addressLine1: address?.addressLine1 || '',
    },
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
    const formValues = shippingControl._defaultValues;

    if (
      watchAddress.state !== formValues.state ||
      watchAddress.city !== formValues.city ||
      watchAddress.postalCode !== formValues.postalCode
    ) {
      setValue('city', watchAddress?.city)
      setValue('state', watchAddress?.state)
      setValue('postalCode', watchAddress?.postalCode);
    }
  }, [watchAddress]);

  useEffect(() => {
    if (!address) return;

    setValue('city', address?.city)
    setValue('state', address?.state)
    setValue('country', address?.country)
    setValue('postalCode', address?.postalCode);
    setValue('addressLine2', address?.addressLine2)
    setValue('addressLine1.label', address?.addressLine1?.label);
  }, [address]);

  return (
    <Accordion>
      <AccordionItem
        key="Shipping Address"
        aria-label="Shipping Address"
        title="Shipping Address"
        classNames={accordionStyles}
        indicator={<ArrowDownIcon />}
      >
        {address && !isOpenForm
          ? <ShippingData address={address} setIsOpenForm={setIsOpenForm} />
          : (
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
                      render={({ field: { value, onChange, onBlur}, fieldState }) => (
                        <GooglePlacesComponent
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={fieldState.error}
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
                  <button type='reset' onClick={onReset} className={style.cancel}>Cancel</button>
                </div>
              </div>
            </form>
          )}
      </AccordionItem>
    </Accordion>
  );
};

export default ShippingForm;
