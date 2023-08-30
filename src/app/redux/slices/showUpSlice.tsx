import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ShowUpState {
  showMobileMenu: boolean;
}

const initialState: ShowUpState = {
  showMobileMenu: false,
};

const showUpSlice = createSlice({
  name: "showUp",
  initialState,
  reducers: {
    setShowMobileMenu(state, action: PayloadAction<boolean>) {
      state.showMobileMenu = action.payload;
    },
  },
});

export const { setShowMobileMenu } = showUpSlice.actions;

export default showUpSlice.reducer;
