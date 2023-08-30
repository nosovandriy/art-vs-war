"use client";

import { useRef } from "react";

import {
  resetArtistGalleryPageCount,
  setArtistId,
  setArtistPaintings,
} from "@/app/redux/slices/artistPaintingsSlice";
import { store } from "@/app/redux/store";
import { ArtCollection } from "@/types/Painting";

type Props = {
  paintingsList: ArtCollection;
  artistId: string;
};

const ArtistPreloader: React.FC<Props> = ({ paintingsList, artistId }) => {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(resetArtistGalleryPageCount());
    store.dispatch(setArtistPaintings(paintingsList));
    store.dispatch(setArtistId(artistId));
    loaded.current = true;
  }

  return null;
};

export default ArtistPreloader;

