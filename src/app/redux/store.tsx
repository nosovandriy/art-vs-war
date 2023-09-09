import { configureStore } from "@reduxjs/toolkit";

import artists from "./slices/searchArtistsSlice";
import artistPaintings from "./slices/artistPaintingsSlice";
import paintings from "./slices/paintingsSlice";
import cart from "./slices/cartSlice";
import shipping from "./slices/shippingSlice";

export const store = configureStore({
  reducer: {
    artists,
    artistPaintings,
    paintings,
    cart,
    shipping,
  },
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
