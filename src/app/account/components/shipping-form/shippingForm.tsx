import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Option } from 'react-google-places-autocomplete/build/types';

import style from '../../account.module.scss';

import { saveAddress } from "@/utils/api";
import { AccountData } from "@/types/Account";
import createHeaders from "@/utils/getAccessToken";
import { getAddressPieces } from "@/utils/account";
import { ArrowDownIcon } from "@/app/icons/iconArrowUp/icon-arrow-down";
import { ShippingFormData, ShippingFormTypes } from "@/types/ShippingForm";
import GooglePlacesComponent from "@/app/components/google-places/googlePlacesComponent";

type Props = {
  account: AccountData | null;
  setAccount: Dispatch<SetStateAction<AccountData | null>>;
}

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

const ShippingForm: FC<Props> = ({ account }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const headers = createHeaders(user);

  const [isOpened, setIsOpened] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState<Option>({
    value: { terms: [{value: ''}, {value: ''}]},
    label: 'Enter you adress (street, building)',
  });

  const {
    control: shippingControl,
    handleSubmit: handleSubmitShipping,
    register: registerShipping,
    formState: { errors: errors2 },
    reset: resetShippingform,
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

  const handleSaveAddress = async (shippingData: ShippingFormTypes) => {
    const savedAddress = await saveAddress(headers, shippingData);

    console.log ('response', savedAddress)
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

  return (
    <Accordion data-open>
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
              <button type='reset' onClick={() => resetShippingform()} className={style.cancel}>Cancel</button>
            </div>
          </div>
        </form>
      </AccordionItem>
    </Accordion>
  );
};

export default ShippingForm;
