import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ArtCollection, Painting } from "@/types/Painting";

export interface PaintingsState {
  search: string;
  paintings: Painting[];
  totalSize: number;
  pagesCount: number;
}

const initialState: PaintingsState = {
  search: "",
  paintings: [],
  totalSize: 0,
  pagesCount: 0,
};

const paintingsSlice = createSlice({
  name: "paintings",
  initialState,
  reducers: {
    setSearchPaintings(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setPaintings(state, action: PayloadAction<ArtCollection>) {
      state.paintings = action.payload.content;
      state.totalSize = action.payload.total;
    },

    addMorePaintings(state, action: PayloadAction<ArtCollection>) {
      state.paintings.push(...action.payload.content);
    },

    increaseGalleryPage(state) {
      state.pagesCount++;
    },

    resetGalleryPageCount(state) {
      state.pagesCount = 0;
    },
  },
});

export const {
  setPaintings,
  setSearchPaintings,
  addMorePaintings,
  increaseGalleryPage,
  resetGalleryPageCount,
} = paintingsSlice.actions;

export default paintingsSlice.reducer;
