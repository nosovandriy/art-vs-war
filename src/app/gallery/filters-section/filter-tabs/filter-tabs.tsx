"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import MasonryGallery from "@/app/components/masonry/masonry";
import { PaintingsTabStyles } from "@/types/PaintingsTabStyles";
import { useAppSelector } from "@/types/ReduxHooks";

import style from "./filter-tabs.module.scss";

const tabs: PaintingsTabStyles[] = [
  PaintingsTabStyles.all,
  PaintingsTabStyles.abstract,
  PaintingsTabStyles.expressionism,
  PaintingsTabStyles.impressionism,
  PaintingsTabStyles.realism,
  PaintingsTabStyles.modern,
  PaintingsTabStyles.surrealism,
];

const FilterTabs = () => {
  const { artistPaintings } = useAppSelector((state) => state.artistPaintings);

  const [selectedTab, setSelectedTab] = useState(PaintingsTabStyles.all);
  const pathname = usePathname();

  const isProfile = pathname === "/profile";

  const onTabSelect = (tab: PaintingsTabStyles) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className={style.tabs}>
        <div className={style.tabs__container}>
          {tabs.map((tab: PaintingsTabStyles) => (
            <div
              key={tab}
              className={tab === selectedTab ? style.isActive : style.tab}
              onClick={() => onTabSelect(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className={style.tabsFooter} />
      </div>

      <div className={style.gallery}>
        {selectedTab === PaintingsTabStyles.all && (
          <>
            <MasonryGallery paintingsList={artistPaintings} />
          </>
        )}
      </div>
    </>
  );
};

export default FilterTabs;
