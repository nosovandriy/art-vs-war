"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Loading from "@/app/loading";
import {
  addMoreArtistPaintings,
  increaseArtistGalleryPage,
} from "@/app/redux/slices/artistPaintingsSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { getPaintingsByArtist } from "@/utils/api";

import style from "./more-artist-paintings.module.scss";

const MoreArtistsAutoFetch = () => {
  const [ref, inView] = useInView({
    threshold: 0,
  });

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

  useEffect(() => {
    if (inView) {
      handleGetNewPage();
    }
  }, [inView]);

  return (
    <>
      {!isEndPaintingList && (
        <div ref={ref}>
          <Loading className={style.className} />
        </div>
      )}
    </>
  );
};

export default MoreArtistsAutoFetch;
