import { CartItem, DataFromLocalStorage } from "@/types/CartItem";
import getTotalPrice from "./calcTotalPrice";

export const getDataFromLocalStorage = (): DataFromLocalStorage => {
  const data = localStorage.getItem("cart");
  const paintingsFromLocalStorage = data ? JSON.parse(data) : [];
  const totalPriceFromLocalStorage = getTotalPrice(paintingsFromLocalStorage);

  return {
    paintingsFromLocalStorage,
    totalPriceFromLocalStorage,
  };
};

export const setDataToLocalStorage = (paintings: CartItem[]) => {
  const json = JSON.stringify(paintings);
  localStorage.setItem("cart", json);
};

