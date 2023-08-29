import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Artist, ArtistsCollection } from "@/types/Artist";

export interface SearchArtistsState {
  search: string;
  foundArtists: Artist[];
  pagesCount: number;
  totalSize: number;
}

const initialState: SearchArtistsState = {
  search: "",
  foundArtists: [],
  pagesCount: 0,
  totalSize: 0,
};

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    setSearchArtists(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFoundArtists(state, action: PayloadAction<ArtistsCollection>) {
      state.foundArtists = action.payload.content;
      state.totalSize = action.payload.total;
    },

    addMoreArtists(state, action: PayloadAction<ArtistsCollection>) {
      state.foundArtists.push(...action.payload.content);
    },

    increaseArtistsPageNumber(state) {
      state.pagesCount++;
    },

    resetArtistsPageNumber(state) {
      state.pagesCount = 0;
    },
  },
});

export const {
  setSearchArtists,
  setFoundArtists,
  addMoreArtists,
  increaseArtistsPageNumber,
  resetArtistsPageNumber,
} = artistsSlice.actions;

export default artistsSlice.reducer;
