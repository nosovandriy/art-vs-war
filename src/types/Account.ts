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
  totalAmount: number;
  isDelivered: boolean;
  shippingAmount: number;
  subtotalAmount: number;
  paintings: OrderPainting[];
  orderCreatedAt: { date: string };
  orderDeliveredAt?: { date: string };
  orderEstimatedDeliverydAt?: { date: string };
};
