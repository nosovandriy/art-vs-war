"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { IconClose } from "@/app/icons/icon-close";
import { IconSearch } from "@/app/icons/icon-search";
import {
  resetGalleryPageCount,
  setPaintings,
  setSearchPaintings,
} from "@/app/redux/slices/paintingsSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { getPaintings } from "@/utils/api";

import style from "./inputGallerySearch.module.scss";

const InputGallerySearch = ({
  searchPanel,
  setSearchPanel,
}: {
  searchPanel: boolean;
  setSearchPanel: (isQuery: boolean) => void;
}) => {
  const [query, setQuery] = useState("");
  const { search } = useAppSelector((state) => state.paintings);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const getFindPaintings = useCallback(
    async (searchQuery?: string) => {
      const params = new URLSearchParams(window.location.search);

      if (searchQuery) {
        params.set("query", searchQuery);
      } else {
        params.delete("query");
      }

      router.replace(`${pathname}?${params.toString()}`);
      const paintings = await getPaintings(params.toString());
      dispatch(resetGalleryPageCount());
      dispatch(setPaintings(paintings));
    },
    [dispatch]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearchPaintings(query.trim()));
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, dispatch]);

  useEffect(() => {
    getFindPaintings(search);
  }, [search, getFindPaintings]);

  const handleSearchPaintings = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
  };

  const handleClearQuery = () => {
    setQuery("");
    getFindPaintings();
  };

  useEffect(() => {
    const queryParam = searchParams.get("query");

    if (queryParam !== null) {
      setSearchPanel(true);
      setQuery(queryParam);
      dispatch(setSearchPaintings(queryParam));
    }
  }, [searchParams, dispatch, setSearchPanel]);

  useEffect(() => {
    if (searchPanel && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchPanel]);

  return (
    <>
      {searchPanel && (
        <div className={style.input}>
          <input
            ref={inputRef}
            type="text"
            className={style.inputField}
            value={query}
            placeholder="Find Paintings"
            onChange={handleSearchPaintings}
          />
          {!query ? (
            <div
              className={style.searchIcon}
              onClick={() => setSearchPanel(!searchPanel)}
            >
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
      )}
    </>
  );
};

export default InputGallerySearch;
