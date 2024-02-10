'use client';

import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useWindowSize } from "react-use";

import style from './artistTabs.module.scss';

import { AddIcon } from '@/app/icons/icon-add';
import { ArrowDownIcon } from '@/app/icons/iconArrowUp/icon-arrow-down';
import { ArtistTabOptions, TabOptionsKeys } from '@/types/ArtistTabOptions';
import { renderItem, tabs } from '@/utils/artistTabs';

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

const ArtistTabs = () => {
  const [selectedTab, setSelectedTab] = useState(ArtistTabOptions.artworks);

  const { width } = useWindowSize();
  const pathname = usePathname();
  const isProfile = pathname === '/profile';

  const renderTabs = isProfile ? tabs : tabs.filter((_, index) => index < 2);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSetSelectedTab = (option: ArtistTabOptions) => {
    setSelectedTab(option);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', option);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedTab(tab as ArtistTabOptions);
      
      const element = document.getElementById('target');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <div className={style.tabs}>
        {width < 1024 && (
          <Accordion
            id="target"
            defaultExpandedKeys={[searchParams.get('tab') || '']}
          >
            {renderTabs.map(({ option, component }) => (
              <AccordionItem
                key={option}
                aria-label={option}
                title={option}
                classNames={accordionStyles}
                indicator={<ArrowDownIcon />}
              >
                {component}
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <div className={style.container}>
          {renderTabs.map(({ option }) => (
            <div
              key={option}
              className={option === selectedTab ? style.isActive : style.tab}
              onClick={() => handleSetSelectedTab(option)}
            >
              {option}
            </div>
          ))}
        </div>

        {isProfile && (
          <Link href="/profile/create-painting" className={style.add}>
            <AddIcon />
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
