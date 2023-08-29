"use client";

import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { getPaintingsByArtist } from "@/utils/api";
import {
  addMoreArtistPaintings,
  increaseArtistGalleryPage,
} from "@/app/redux/slices/artistPaintingsSlice";

import style from "./more-artist-paintings.module.scss";

const MoreArtistPaintingsButton = () => {
  const { totalSize, artistPaintings, pagesCount, artistId } = useAppSelector(
    (state) => state.artistPaintings
  );

  const dispatch = useAppDispatch();

  const isEndPaintingList = totalSize <= artistPaintings.length;

  const handleGetNewPage = async () => {
    const currentPage = pagesCount + 1;

    const moreArtistPaintings = await getPaintingsByArtist(
      artistId,
      currentPage
    );

    dispatch(addMoreArtistPaintings(moreArtistPaintings));
    dispatch(increaseArtistGalleryPage());
  };

  return (
    <>
      {!isEndPaintingList && (
        <button className={style.button} onClick={handleGetNewPage}>
          More Artworks
        </button>
      )}
    </>
  );
};

export default MoreArtistPaintingsButton;
