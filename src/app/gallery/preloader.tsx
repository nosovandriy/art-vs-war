"use client";

import { useRef } from "react";

import { ArtCollection } from "@/types/Painting";
import {
  resetGalleryPageCount,
  setPaintings,
} from "../redux/slices/paintingsSlice";
import { store } from "../redux/store";

const Preloader = ({ artCollection }: { artCollection: ArtCollection }) => {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(resetGalleryPageCount());
    store.dispatch(setPaintings(artCollection));
    loaded.current = true;
  }

  return null;
};

export default Preloader;
