"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Loading from "@/app/loading";
import {
  addMoreArtists,
  increaseArtistsPageNumber,
} from "@/app/redux/slices/searchArtistsSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { getArtists } from "@/utils/api";

import style from "./more-artists-auto-fetch.module.scss";

const MoreArtistsAutoFetch = () => {
  const [ref, inView] = useInView({
    threshold: 0,
  });

  const { pagesCount, totalSize, foundArtists, search } = useAppSelector(
    (state) => state.artists
  );
  const dispatch = useAppDispatch();
  const isEndArtistsList = totalSize <= foundArtists.length;

  const getAdditionalPaintings = async (searchQuery: string) => {
    const artists = await getArtists(searchQuery);
    dispatch(addMoreArtists(artists));
  };

  const handleGetNewPage = () => {
    dispatch(increaseArtistsPageNumber());
    const currentPage = pagesCount + 1;
    !search
      ? getAdditionalPaintings(`?page=${currentPage}`)
      : getAdditionalPaintings(`?page=${currentPage}&query=${search}`);
  };

  useEffect(() => {
    if (inView) {
      handleGetNewPage();
    }
  }, [inView]);

  return (
    <>
      {!isEndArtistsList && (
        <div ref={ref}>
          <Loading className={style.className} />
        </div>
      )}
    </>
  );
};

export default MoreArtistsAutoFetch;
