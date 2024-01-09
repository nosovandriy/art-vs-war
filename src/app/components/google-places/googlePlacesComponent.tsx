import { FC, Dispatch, SetStateAction } from "react";
import { FieldError, Noop } from "react-hook-form";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { selectStyles } from './styles';

import { OptionDetails } from '@/types/ShippingForm';
import { SingleValue } from 'react-select';
import { Option } from 'react-google-places-autocomplete/build/types';
import { getPlaceDetails } from '@/utils/account';

interface GooglePlacesComponentProps {
  error?: FieldError | undefined;
  value: OptionDetails;
  onBlur: Noop;
  onChange: Dispatch<SetStateAction<OptionDetails>>;
}

const GooglePlacesComponent: FC<GooglePlacesComponentProps> = ({
  error,
  value,
  onBlur,
  onChange,
}) => {
  const onChangeValue = async (newValue: SingleValue<Option>) => {

    if (newValue) {
      const details = await getPlaceDetails(newValue?.value?.place_id);

      const foundAddress = {
        value: newValue?.value,
        label: newValue?.value?.structured_formatting?.main_text || '',
        postalCode: details?.postalCode || '',
        country: details?.country || '',
        state: details?.state || '',
        city: details?.city || '',
      };

      onChange(foundAddress);
    }
  };

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
          //@ts-ignore
          styles: {
            ...selectStyles,
              singleValue: (provided) => ({
                ...provided,
                color: (value.label.includes('Enter')) ? '#78797A' : '#F9FAFB',
                fontSize: '16px',
                fontFamily: 'var(--font-openSans)',
                opacity: 1,
              }),
          },
        }}
      />
      {error && <div style={{ color: '#d32b10', fontSize: 10 }}>{error.message}</div>}
    </div>
  );
};

export default GooglePlacesComponent;
