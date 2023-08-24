import {
  PaintingsShippingInfo,
  ShippingFormTypes,
  TotalShippingInfo,
} from "@/types/ShippingForm";
import { calculateTotalShippingInfo } from "@/utils/calcTotalShippingInfo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ShippingOrder {
  shippingAddress: ShippingFormTypes | {};
  paintingsShippingInfo: PaintingsShippingInfo[];
  totalShippingInfo: TotalShippingInfo[];
}

const initialState: ShippingOrder = {
  shippingAddress: {},
  paintingsShippingInfo: [],
  totalShippingInfo: [],
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShippingAddress(state, action: PayloadAction<ShippingFormTypes>) {
      state.shippingAddress = { ...action.payload };
    },

    setPaintingsShippingInfo(
      state,
      action: PayloadAction<PaintingsShippingInfo[]>
    ) {
      state.paintingsShippingInfo = action.payload;
      state.totalShippingInfo = calculateTotalShippingInfo(action.payload);
    },

    clearShippingInfo(state) {
      state.paintingsShippingInfo = [];
      state.totalShippingInfo = [];
    },
  },
});

export const {
  setShippingAddress,
  setPaintingsShippingInfo,
  clearShippingInfo,
} = shippingSlice.actions;

export default shippingSlice.reducer;
