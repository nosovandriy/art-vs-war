import { OrderPainting } from "./Painting";

export interface AccountFormData {
  firstName: string,
  lastName: string,
  phone: string,
}

export interface AccountData extends AccountFormData {
  email: string,
}

export interface CreatedAccountResponse extends AccountData {
  cognitoSubject: string,
  cognitoUsername: string,
}

export interface Order {
  id: number;
  isDelivered: boolean;
  orderCreatedAt: { orderCreatedAt: string };
  paintings: OrderPainting[];
  shippingAmount: number;
  subtotalAmount: number;
  totalAmount: number;
};
