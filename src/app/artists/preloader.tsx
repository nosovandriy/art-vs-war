"use client";

import { useRef } from "react";

import { ArtistsCollection } from "@/types/Artist";
import { setFoundArtists } from "../redux/slices/searchArtistsSlice";
import { store } from "../redux/store";

function Preloader({ artistsList }: { artistsList: ArtistsCollection }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setFoundArtists(artistsList));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
