import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FieldError, ControllerRenderProps } from "react-hook-form";
import { Option } from 'react-google-places-autocomplete/build/types';

import { selectStyles } from "./styles";

import { ShippingFormData } from "@/types/ShippingForm";

interface GooglePlacesComponentProps {
  error: FieldError | undefined;
  value: Option;
  field: ControllerRenderProps<ShippingFormData, "addressLine1">;
  setSelectedPlace:  Dispatch<SetStateAction<Option>>;
}

const GooglePlacesComponent: React.FC<GooglePlacesComponentProps> = ({ field, error, setSelectedPlace, value }) => {
  const getSlicedAdress = (value: string) => value.split(', ').slice(0, 2).join(', ');
   const ref = useRef<HTMLDivElement | null>(null);

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
          onChange: (newValue) => {
              return newValue && (
              setSelectedPlace({
                value: newValue.value,
                label: getSlicedAdress(newValue.label),
              })
          )},
          styles: selectStyles,
        }}
      />
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </div>
  )
};

export default GooglePlacesComponent;
