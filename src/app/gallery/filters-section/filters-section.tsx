"use client";

import { useState } from "react";

import { IconSearch } from "@/app/icons/icon-search";
import { PaintingFilterParams } from "@/types/Painting";
import InputGallerySearch from "../inputGallerySearch/inputGallerySearch";
import Filter from "./filter/filter";
import Sort from "./sort/sort";

import style from "./filters-section.module.scss";
type Props = {
  filtersData: PaintingFilterParams;
};

const FiltersSection: React.FC<Props> = ({ filtersData }) => {
  const [styleCheckOptions, setStyleCheckOptions] = useState<string[]>([]);
  const [searchPanel, setSearchPanel] = useState(false);

  return (
    <div>
      {/* <FilterTabs /> */}
      <div className={style.filters}>
        <div className={style.search}>
          <InputGallerySearch
            setSearchPanel={setSearchPanel}
            searchPanel={searchPanel}
          />
        </div>
        {!searchPanel && (
          <div
            className={style.iconSearch}
            onClick={() => setSearchPanel(!searchPanel)}
          >
            <IconSearch />
          </div>
        )}

        <Sort />
        <Filter
          filtersData={filtersData}
          styleCheckOptions={styleCheckOptions}
          setStyleCheckOptions={setStyleCheckOptions}
        />
      </div>
    </div>
  );
};

export default FiltersSection;
