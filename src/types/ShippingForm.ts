export interface ShippingFormTypes {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  state_region?: string;
  postcode: string;
  addressMain: string;
  addressFirstAdditional?: string;
  addressSecondAdditional?: string;
  phoneNumber: string;
}
