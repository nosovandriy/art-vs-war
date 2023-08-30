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