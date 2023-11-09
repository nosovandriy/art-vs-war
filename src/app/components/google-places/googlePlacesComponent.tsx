import { useRef, useEffect, Dispatch, SetStateAction, FC, useState, useCallback } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FieldError, Noop } from "react-hook-form";

import { selectStyles } from "./styles";

import { AuthorShippingFormData, OptionDetails } from "@/types/ShippingForm";
import { SingleValue } from "react-select";
import { Option } from "react-google-places-autocomplete/build/types";
import { getPlaceDetails } from "@/utils/account";

interface GooglePlacesComponentProps {
  error: FieldError | undefined;
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
  console.log('value', value)

  const getSlicedAdress = (value: string) => value.split(', ').slice(0, 2).join(', ');
  const ref = useRef<HTMLDivElement | null>(null);

  const onChangeValue = async (newValue: SingleValue<Option>) => {
    if (newValue) {
      // setInputValue(newValue.label);

      const details = await getPlaceDetails(newValue?.value?.place_id);

      const foundAddress = {
        value: newValue.value,
        label: getSlicedAdress(newValue.label),
        postalCode: details.postalCode || '',
        state: details.state || '',
        city: details.city || '',
      }

      onChange(foundAddress);
    }
  }

  // useEffect(() => {
  //   setInputValue(value.label)
  // }, [value, onInputChange]);

  //  useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (ref.current) {
  //       const target = event.target as Node;
  //       if (!ref.current.contains(target)) {
  //         ref.current.blur();
  //       }
  //     }
  //   };

  //    document.addEventListener('click', handleClickOutside);

  //    return () => {
  //      document.removeEventListener('click', handleClickOutside);
  //    };
  //  }, []);

  return (
    <div ref={ref}>
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
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </div>
  )
};

export default GooglePlacesComponent;
