import { CartItem } from "@/types/CartItem";

const getTotalPrice = (itemsStore: CartItem[]) => {
  return itemsStore.reduce((sum, item) => item.price + sum, 0);
};

export default getTotalPrice;
