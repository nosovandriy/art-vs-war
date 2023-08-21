import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartItem, DataFromLocalStorage } from "@/types/CartItem";
import getTotalPrice from "@/utils/calcTotalPrice";
import { setDataToLocalStorage } from "@/utils/localStorageData";

export interface CartState {
  paintings: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  paintings: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setDataToCartFromLocalStorage: (
      state,
      action: PayloadAction<DataFromLocalStorage>
    ) => {
      if (state.paintings.length > 0) {
        const objectExistsInPaintings = (item: CartItem) => {
          return state.paintings.some((painting) => painting.id === item.id);
        };

        action.payload.paintingsFromLocalStorage
          .filter((item) => !objectExistsInPaintings(item))
          .forEach((newItem) => {
            state.paintings.push(newItem);
          });
      } else {
        state.paintings = [
          ...state.paintings,
          ...action.payload.paintingsFromLocalStorage,
        ];
      }

      state.totalPrice = getTotalPrice(state.paintings);
    },

    setCartDataFromServer: (state, action: PayloadAction<CartItem[]>) => {
      if (state.paintings.length > 0) {
        const objectExistsInPaintings = (item: CartItem) => {
          return state.paintings.some((painting) => painting.id === item.id);
        };

        action.payload
          .filter((item) => !objectExistsInPaintings(item))
          .forEach((newItem) => {
            state.paintings.push(newItem);
          });
      } else {
        state.paintings = [...state.paintings, ...action.payload];
      }

      state.totalPrice = getTotalPrice(state.paintings);
    },

    addPaintingToCart: (state, action: PayloadAction<CartItem>) => {
      if (state.paintings.length > 0) {
        const findPainting = state.paintings.find(
          (painting) => painting.id === action.payload.id
        );

        if (!findPainting) {
          state.paintings.push(action.payload);
          state.totalPrice = getTotalPrice(state.paintings);
        }
      } else {
        state.paintings.push(action.payload);
        state.totalPrice = getTotalPrice(state.paintings);
      }

      setDataToLocalStorage(state.paintings);
    },

    removePaintingFromCart(state, action: PayloadAction<CartItem | number>) {
      const findPainting = state.paintings.find(
        (painting) => painting.id === action.payload
      );

      if (findPainting) {
        state.paintings = state.paintings.filter(
          (item) => item !== findPainting
        );
      }

      state.totalPrice = getTotalPrice(state.paintings);
      setDataToLocalStorage(state.paintings);
    },
  },
});

export const {
  addPaintingToCart,
  removePaintingFromCart,
  setDataToCartFromLocalStorage,
  setCartDataFromServer,
} = cartSlice.actions;

export default cartSlice.reducer;
