import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ArtCollection, ArtProcess, Painting } from "@/types/Painting";

export interface PaintingsState {
  artistPaintings: Painting[];
  artProcessImages: ArtProcess[];
  artistId: string;
  totalSize: number;
  pagesCount: number;
}

const initialState: PaintingsState = {
  artistPaintings: [],
  artProcessImages: [],
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

    setArtProcessImages(state, action: PayloadAction<ArtProcess[]>) {
      state.artProcessImages = action.payload;
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
  setArtProcessImages,
} = artistPaintingsSlice.actions;

export default artistPaintingsSlice.reducer;
