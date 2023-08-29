"use client";

import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

import MasonryGallery from "@/app/components/masonry/masonry";
import { Add } from "@/app/icons/icon-add";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import { useAppSelector } from "@/types/ReduxHooks";
import ArtProcess from "./artProcess/artProcess";
import MoreArtistPaintingsButton from "./artProcess/more-artist-paintings/more-artist-paintings";

import style from "./artistTabs.module.scss";
import Collection from "@/app/components/collection/collection";
import React from "react";

const tabs: ArtistTabOptions[] = [
  ArtistTabOptions.artworks,
  ArtistTabOptions.collections,
  ArtistTabOptions.artProcess,
];

type Props = {
  setOpenForm?: Dispatch<SetStateAction<ArtistTabOptions | null>>;
};

const ArtistTabs: React.FC<Props> = ({ setOpenForm }) => {
  const { artistPaintings } = useAppSelector((state) => state.artistPaintings);

  const [selectedTab, setSelectedTab] = useState(ArtistTabOptions.artworks);
  const pathname = usePathname();

  const isProfile = pathname === "/profile";

  const onTabSelect = (tab: ArtistTabOptions) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className={style.tabs}>
        <div className={style.tabs__container}>
          {tabs.map((tab: ArtistTabOptions) => (
            <div
              key={tab}
              className={tab === selectedTab ? style.isActive : style.tab}
              onClick={() => onTabSelect(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {isProfile && setOpenForm && (
          <Link
            href="/profile/createPainting"
            className={style.add}
          >
            <Add />
            {selectedTab}
          </Link>
        )}

        <div className={style.tabsFooter} />
      </div>

      <div className={style.gallery}>
        {selectedTab === ArtistTabOptions.artworks && (
          <>
            <MasonryGallery paintingsList={artistPaintings} />
            <MoreArtistPaintingsButton />
          </>
        )}
        {selectedTab === ArtistTabOptions.artProcess && <ArtProcess />}
        {selectedTab === ArtistTabOptions.collections && <Collection />}
      </div>
    </>
  );
};

export default ArtistTabs;
