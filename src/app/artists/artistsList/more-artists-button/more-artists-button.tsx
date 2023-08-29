"use client";

import {
  addMoreArtists,
  increaseArtistsPageNumber,
} from "@/app/redux/slices/searchArtistsSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { getArtists } from "@/utils/api";

import style from "./more-artists-button.module.scss";

const MoreArtistsButton = () => {
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

  return (
    <>
      {!isEndArtistsList && (
        <button className={style.button} onClick={handleGetNewPage}>
          More Artists
        </button>
      )}
    </>
  );
};

export default MoreArtistsButton;
