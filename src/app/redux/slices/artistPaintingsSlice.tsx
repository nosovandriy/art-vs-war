import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ArtCollection, Painting } from "@/types/Painting";

export interface PaintingsState {
  artistPaintings: Painting[];
  artistId: string;
  totalSize: number;
  pagesCount: number;
}

const initialState: PaintingsState = {
  artistPaintings: [],
  artistId: "",
  totalSize: 0,
  pagesCount: 0,
};

const artistPaintingsSlice = createSlice({
  name: "artistPaintings",
  initialState,
  reducers: {
    setArtistPaintings(state, action: PayloadAction<ArtCollection>) {
      state.artistPaintings = action.payload.content;
      state.totalSize = action.payload.total;
    },

    setArtistId(state, action: PayloadAction<string>) {
      state.artistId = action.payload;
    },

    addMoreArtistPaintings(state, action: PayloadAction<ArtCollection>) {
      state.artistPaintings.push(...action.payload.content);
    },

    increaseArtistGalleryPage(state) {
      state.pagesCount++;
    },

    resetArtistGalleryPageCount(state) {
      state.pagesCount = 0;
    },
  },
});

export const {
  setArtistPaintings,
  addMoreArtistPaintings,
  setArtistId,
  increaseArtistGalleryPage,
  resetArtistGalleryPageCount,
} = artistPaintingsSlice.actions;

export default artistPaintingsSlice.reducer;
