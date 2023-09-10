"use client";

import { useState } from "react";

import { IconSearch } from "@/app/icons/icon-search";
import InputGallerySearch from "../inputGallerySearch/inputGallerySearch";

import style from "./mobile-search.module.scss";

const MobileSearch = ({ totalPaintings }: { totalPaintings: number }) => {
  const [searchPanel, setSearchPanel] = useState(false);
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.titleWrapper}>
          <h1 className={style.title}>Gallery</h1>
          <p className={style.title__info}>&nbsp;{`${totalPaintings}`}</p>
        </div>

        <div
          className={style.iconSearch}
          onClick={() => setSearchPanel(!searchPanel)}
        >
          <IconSearch />
        </div>
      </div>
      <div className={style.mobileInputSearch}>
        <InputGallerySearch
          searchPanel={searchPanel}
          setSearchPanel={setSearchPanel}
        />
      </div>
    </>
  );
};

export default MobileSearch;
