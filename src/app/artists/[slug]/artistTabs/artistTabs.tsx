"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import Link from "next/link";

import style from "./artistTabs.module.scss";

import { Add } from "@/app/icons/icon-add";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";
import { renderItem, tabs } from "@/utils/artistTabs";
import { ArrowDownIcon } from "@/app/icons/iconArrowUp/icon-arrow-down";

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

const ArtistTabs = () => {
  const [selectedTab, setSelectedTab] = useState(ArtistTabOptions.artworks);
  const [openTab, setOpenTab] = useState<ArtistTabOptions | null>(null);
  const pathname = usePathname();
  const isProfile = pathname === "/profile";

  const renderTabs = isProfile ? tabs :  tabs.filter((_, index) => index <= 2);

  const onTabSelect = (tab: ArtistTabOptions) => {
    if (tab === openTab) {
      setOpenTab(null);
    } else {
      setOpenTab(tab);
    }
  };

  return (
    <>
      <div className={style.tabs}>
        <Accordion className={style.accordion}>
        {renderTabs.map(({ option, component }) => (
            <AccordionItem
              key={option}
              aria-label={option}
              title={option}
              classNames={accordionStyles}
              indicator={<ArrowDownIcon isRotated={option === openTab} />}
              onPressStart={() => onTabSelect(option)}
            >
              {component}
            </AccordionItem>
          ))}
        </Accordion>

        <div className={style.container}>
          {renderTabs.map(({ option })=> (
              <div
                key={option}
                className={option === selectedTab ? style.isActive : style.tab}
                onClick={() => setSelectedTab(option)}
              >
                {option}
              </div>
            ))}
        </div>

        {isProfile && (
          <Link href="/profile/createPainting" className={style.add}>
            <Add />
            Add arts
          </Link>
        )}

        <div className={style.tabsFooter} />
      </div>

      <div className={style.gallery}>{renderItem(selectedTab)}</div>
    </>
  );
};

export default ArtistTabs;
