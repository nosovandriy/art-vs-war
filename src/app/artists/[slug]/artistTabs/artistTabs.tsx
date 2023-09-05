"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import Link from "next/link";

import { Add } from "@/app/icons/icon-add";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import { useAppSelector } from "@/types/ReduxHooks";
import ArtProcess from "./artProcess/artProcess";

import style from "./artistTabs.module.scss";

import Collection from "@/app/components/collection/collection";
import ArtistPaintings from "./artistPaintings/artistPaintings";

const tabs: ArtistTabOptions[] = [
  ArtistTabOptions.artworks,
  ArtistTabOptions.collections,
  ArtistTabOptions.artProcess,
];

const ArtistTabs = () => {
  const { artistPaintings } = useAppSelector((state) => state.artistPaintings);

  const [selectedTab, setSelectedTab] = useState(ArtistTabOptions.artworks);
  const pathname = usePathname();

  const isProfile = pathname === "/profile";

  const onTabSelect = (tab: ArtistTabOptions) => {
    setSelectedTab(tab);
  };

  const components = [
    {
      option: ArtistTabOptions.artworks,
      component: <ArtistPaintings paintings={artistPaintings} />,
    },
    {
      option: ArtistTabOptions.collections,
      component: <ArtProcess />,
    },
    {
      option: ArtistTabOptions.artProcess,
      component: <Collection />,
    },
  ]

  const styles = {
    base: style.accordion,
    title: style.accordionTitle,
    trigger: style.accordionItem,
    content: [style.accordionTitle, style.accordionItem, style.contenet],
    indicator: style.indicator,
  };

  return (
    <>
      <div className={style.tabs}>
        <div className={style.tabs__container}>
          {/* {tabs.map((tab: ArtistTabOptions, index) => (
            <div
              key={tab}
              className={tab === selectedTab ? style.isActive : style.tab}
              onClick={() => onTabSelect(tab)}
            >
              {tab}
            </div>
          ))} */}

          {components.map(item => (
            <Accordion
              key={item.option}
              className={style.accordion}
              variant="bordered"
            >
              <AccordionItem
                aria-label={item.option}
                title={item.option}
                classNames={styles}
              >
              {item.component}
            </AccordionItem>
          </Accordion>
          ))}
        </div>

        {isProfile && (
          <Link
            href="/profile/createPainting"
            className={style.add}
          >
            <Add />
            Add artworks
          </Link>
        )}

        <div className={style.tabsFooter} />
      </div>

      <div className={style.gallery}>
        {selectedTab === ArtistTabOptions.artworks && <ArtistPaintings paintings={artistPaintings} />}
        {selectedTab === ArtistTabOptions.artProcess && <ArtProcess />}
        {selectedTab === ArtistTabOptions.collections && <Collection />}
      </div>
    </>
  );
};

export default ArtistTabs;
