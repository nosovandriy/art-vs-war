"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Collection from "@/app/components/collection/collection";
import MasonryGallery from "@/app/components/masonry/masonry";
import { Add } from "@/app/icons/icon-add";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import { useAppSelector } from "@/types/ReduxHooks";
import ArtProcess from "./artProcess/artProcess";

import MoreArtistsAutoFetch from "./artProcess/more-artist-paintings/more-artist-paintings";
const tabs: ArtistTabOptions[] = [
  ArtistTabOptions.artworks,
  ArtistTabOptions.collections,
  ArtistTabOptions.artProcess,
];

import style from "./artistTabs.module.scss";

const ArtistTabs = () => {
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

        {isProfile && (
          <Link href="/profile/createPainting" className={style.add}>
            <Add />
            Add artworks
          </Link>
        )}

        <div className={style.tabsFooter} />
      </div>

      <div className={style.gallery}>
        {selectedTab === ArtistTabOptions.artworks && (
          <>
            <MasonryGallery paintingsList={artistPaintings} />
            <MoreArtistsAutoFetch />
          </>
        )}
        {selectedTab === ArtistTabOptions.artProcess && <ArtProcess />}
        {selectedTab === ArtistTabOptions.collections && <Collection />}
      </div>
    </>
  );
};

export default ArtistTabs;
