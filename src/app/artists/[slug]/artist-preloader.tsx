"use client";

import { useRef } from "react";

import {
  resetArtistGalleryPageCount,
  setArtProcessImages,
  setArtistId,
  setArtistPaintings,
} from "@/app/redux/slices/artistPaintingsSlice";
import { store } from "@/app/redux/store";
import { ArtCollection, ArtProcess } from "@/types/Painting";

type Props = {
  paintingsList: ArtCollection;
  artistId: string;
  artProcessImages: ArtProcess[];
};

const ArtistPreloader: React.FC<Props> = ({
  paintingsList,
  artistId,
  artProcessImages,
}) => {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(resetArtistGalleryPageCount());
    store.dispatch(setArtistPaintings(paintingsList));
    store.dispatch(setArtistId(artistId));
    store.dispatch(setArtProcessImages(artProcessImages));
    loaded.current = true;
  }

  return null;
};

export default ArtistPreloader;
