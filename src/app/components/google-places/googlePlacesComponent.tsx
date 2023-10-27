import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FieldError, ControllerRenderProps } from "react-hook-form";

import { selectStyles } from "./styles";

import { OptionDetails, ShippingFormData } from "@/types/ShippingForm";

interface GooglePlacesComponentProps {
  error: FieldError | undefined;
  value: OptionDetails;
  field: ControllerRenderProps<ShippingFormData, "addressLine1">;
  setSelectedPlace:  Dispatch<SetStateAction<OptionDetails>>;
}

const GooglePlacesComponent: React.FC<GooglePlacesComponentProps> = ({ field, error, setSelectedPlace, value }) => {
  const getSlicedAdress = (value: string) => value.split(', ').slice(0, 2).join(', ');
   const ref = useRef<HTMLDivElement | null>(null);

   const getPlaceDetails = (placeId: string): Promise<{ postalCode: string | undefined, state: string | undefined, city: string | undefined }> => {
    return new Promise((resolve) => {
      const service = new google.maps.places.PlacesService(document.createElement("div"));

      service.getDetails(
        {
          placeId,
          fields: ["address_component", "name"],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const postalCode = place?.address_components?.find(
              (component) => component.types.includes("postal_code")
            )?.long_name;
            const state = place?.address_components?.find(
              (component) => component.types.includes("administrative_area_level_1")
            )?.long_name;

            // Prioritize locality for city information
            const city = place?.address_components?.find(
              (component) => component.types.includes("locality")
            )?.long_name || place?.name;

            resolve({ postalCode, state, city });
          } else {
            console.error("Error fetching place details:", status);
            resolve({ postalCode: undefined, state: undefined, city: undefined });
          }
        }
      );
    });
  };

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current) {
        const target = event.target as Node;
        if (!ref.current.contains(target)) {
          ref.current.blur();
        }
      }
    };

     document.addEventListener('click', handleClickOutside);

     return () => {
       document.removeEventListener('click', handleClickOutside);
     };
   }, []);

  return (
    <div ref={ref}>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyCw5RG5hV0guHJOEenpb6afKt2MGSZB_Tw"
        apiOptions={{ language: 'en' }}
        selectProps={{
          ...field,
          value,
          isClearable: true,
          onChange: async (newValue) => {
            if (newValue) {
              const details = await getPlaceDetails(newValue?.value?.place_id);
              setSelectedPlace({
                value: newValue.value,
                label: getSlicedAdress(newValue.label),
                postalCode: details.postalCode || '',
                state: details.state || '',
                city: details.city || '',
              });
            }
          },
          styles: {
            ...selectStyles,
              singleValue: (provided) => ({
                ...provided,
                color: value?.label?.length ? '#F9FAFB' : '#78797A',
                fontSize: '16px',
                fontFamily: 'var(--font-openSans)',
              }),
          },
        }}
      />
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </div>
  )
};

export default GooglePlacesComponent;
