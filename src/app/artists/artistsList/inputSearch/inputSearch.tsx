"use client";

import { useCallback, useEffect, useState } from "react";

import { IconClose } from "@/app/icons/icon-close";
import { IconSearch } from "@/app/icons/icon-search";
import {
  resetArtistsPageNumber,
  setFoundArtists,
  setSearchArtists,
} from "@/app/redux/slices/searchArtistsSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { getArtists } from "@/utils/api";

import style from "./inputSearch.module.scss";

const InputArtistSearch = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const { search } = useAppSelector((state) => state.artists);

  const getFindArtists = useCallback(
    async (searchQuery?: string) => {
      const artists = await getArtists(searchQuery);

      dispatch(resetArtistsPageNumber());
      dispatch(setFoundArtists(artists));
    },
    [dispatch]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearchArtists(query.trim()));
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, dispatch]);

  useEffect(() => {
    getFindArtists(`?query=${search}`);
  }, [search, getFindArtists]);

  const handleSearchArtist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClearQuery = () => {
    setQuery("");
    getFindArtists();
  };

  return (
    <div className={style.input}>
      <input
        type="text"
        className={style.inputField}
        value={query}
        placeholder="Find Artist"
        onChange={handleSearchArtist}
      />
      {!query ? (
        <div className={style.searchIcon}>
          <IconSearch />
        </div>
      ) : (
        <div
          className={`${style.searchIcon} ${style.closeIcon}`}
          onClick={handleClearQuery}
        >
          <IconClose />
        </div>
      )}
    </div>
  );
};

export default InputArtistSearch;
