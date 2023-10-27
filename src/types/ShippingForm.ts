import { Option } from 'react-google-places-autocomplete/build/types';

export interface ShippingFormTypes {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  state?: string;
  postalCode: string;
  addressLine1: string;
  addressLine2?: string;
  phone: string;
}

export interface PaintingsShippingInfo {
  paintingId: number;
  shippingPrice: number;
  deliveryMinDays: number;
  deliveryMaxDays: number;
}

export interface TotalShippingInfo {
  totalShippingPrice: number;
  totalDeliveryMinDays: number;
  totalDeliveryMaxDays: number;
}

export interface ShippingInfo {
  shippingRates: TotalShippingInfo[] | [];
  shippingAddress: ShippingFormTypes | {};
}

export interface ShippingFormData {
  city: string,
  state?: string,
  country: string,
  postalCode: string,
  addressLine1: any,
  addressLine2?: string,
}

export interface ShippingResponseData extends ShippingFormTypes {
  countryCode: string,
}

export interface MessageFormTypes {
  email: string;
  message: string;
}

export interface OptionDetails {
  value: any;
  city: string;
  label: string;
  state: string,
  postalCode: string,
}
