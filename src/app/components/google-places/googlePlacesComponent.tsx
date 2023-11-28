import { FC, useRef, Dispatch, SetStateAction } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FieldError, Noop } from "react-hook-form";

import { selectStyles } from "./styles";

import { OptionDetails } from "@/types/ShippingForm";
import { SingleValue } from "react-select";
import { Option } from "react-google-places-autocomplete/build/types";
import { getPlaceDetails } from "@/utils/account";

interface GooglePlacesComponentProps {
  error?: FieldError | undefined;
  value: OptionDetails;
  onBlur: Noop;
  onChange:  Dispatch<SetStateAction<OptionDetails>>;
}

const GooglePlacesComponent: FC<GooglePlacesComponentProps> = ({
  error,
  value,
  onBlur,
  onChange,
}) => {
  const getSlicedAdress = (value: string) => value.split(', ').slice(0, 2).join(', ');
  const ref = useRef<HTMLDivElement | null>(null);

  const onChangeValue = async (newValue: SingleValue<Option>) => {
    if (newValue) {
      const details = await getPlaceDetails(newValue?.value?.place_id);

      console.log('details', details)

      const foundAddress = {
        value: newValue?.value,
        label: getSlicedAdress(newValue.label) || '',
        postalCode: details?.postalCode || '',
        country: details?.country || '',
        state: details?.state || '',
        city: details?.city || '',
      }

      onChange(foundAddress);
    }
  }

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyCw5RG5hV0guHJOEenpb6afKt2MGSZB_Tw"
        apiOptions={{ language: 'en' }}
        selectProps={{
          value,
          placeholder: 'Enter your address',
          onBlur: onBlur,
          onChange: onChangeValue,
          isSearchable: true,
          styles: {
            ...selectStyles,
              singleValue: (provided) => ({
                ...provided,
                color: value?.label?.length ? '#F9FAFB' : '#78797A',
                fontSize: '16px',
                fontFamily: 'var(--font-openSans)',
                opacity: 1,
              }),
          },
        }}
      />
      {error && <div style={{ color: "#d32b10", fontSize: 10 }}>{error.message}</div>}
    </div>
  )
};

export default GooglePlacesComponent;
