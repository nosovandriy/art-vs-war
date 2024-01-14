import Autocomplete from 'react-google-autocomplete';
import { FieldError, UseFormSetValue } from 'react-hook-form';

import './react-google-autocomplete.scss';

type Props = {
  error: FieldError | undefined;
  value?: string;
  onChange: (phoneNumber: string) => void;
  setValue: UseFormSetValue<any>;
};

interface PlaceDetails {
  postalCode: string | undefined;
  state: string | undefined;
  city: string | undefined;
  country: string | undefined;
  street: string | undefined;
  building: string | undefined;
  number: string | undefined;
}

const getPlaceDetails = (placeId: string): Promise<PlaceDetails> => {
  return new Promise((resolve) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails(
      {
        placeId,
        fields: ['address_component', 'name', 'geometry'],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const postalCode = place?.address_components?.find((component) =>
            component.types.includes('postal_code'),
          )?.long_name;
          const state = place?.address_components?.find((component) =>
            component.types.includes('administrative_area_level_1'),
          )?.long_name;

          const city =
            place?.address_components?.find(
              (component) =>
                component.types.includes('locality') ||
                component.types.includes('postal_town') ||
                component.types.includes('sublocality_level_1'),
            )?.long_name || place?.name;

          const country =
            place?.address_components?.find((component) => component.types.includes('country'))
              ?.long_name || place?.name;

          const street = place?.address_components?.find((component) =>
            component.types.includes('route'),
          )?.long_name;

          const building = place?.address_components?.find((component) =>
            component.types.includes('premise'),
          )?.long_name;

          const number = place?.address_components?.find((component) =>
            component.types.includes('street_number'),
          )?.long_name;

          resolve({ postalCode, state, city, country, street, building, number });
        } else {
          console.error('Error fetching place details:', status);
          resolve({
            postalCode: undefined,
            state: undefined,
            city: undefined,
            country: undefined,
            street: undefined,
            building: undefined,
            number: undefined,
          });
        }
      },
    );
  });
};

export const GoogleAutocompleteAddress: React.FC<Props> = ({
  setValue,
  value,
  error,
  onChange,
}) => {
  const handleChangeVale = async (newValue: any) => {
    const details = await getPlaceDetails(newValue?.place_id);

    setValue('country', details.country);
    setValue('state', details.state);
    setValue('city', details.city);
    setValue('postalCode', details.postalCode);

    if (details.number) {
      setValue('addressLine1', details.number + ', ' + details.street);
    } else {
      setValue('addressLine1', details.street);
    }
  };

  return (
    // @ts-ignore
    <Autocomplete
      value={value}
      style={error && { border: '1px solid red' }}
      placeholder={'Enter your street, apartment, №...'}
      onChange={(event: any) => onChange(event.target.value)}
      language="en"
      apiKey={'AIzaSyCw5RG5hV0guHJOEenpb6afKt2MGSZB_Tw'}
      onPlaceSelected={(place) => handleChangeVale(place)}
      on
      options={{
        types: ['geocode', 'establishment'],
      }}
    />
  );
};
