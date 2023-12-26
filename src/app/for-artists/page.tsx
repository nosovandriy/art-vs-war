'use client';

import { useEffect, useState } from 'react';
import Transfers from './transfers/transfers';
import Packaging from './packaging/packaging';

import style from './page.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

enum ArtistInformation {
  transfers = 'Transfers and Payouts',
  packaging = 'Packaging Guidelines',
}

const tabs = [
  {
    option: ArtistInformation.transfers,
    // component: <Transfers />,
  },
  {
    option: ArtistInformation.packaging,
    component: 'Packaging Guidelines',
  },
];

const ForArtist = () => {
  const [selectedTab, setSelectedTab] = useState<ArtistInformation>(ArtistInformation.transfers);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSetSelectedTab = (option: ArtistInformation) => {
    setSelectedTab(option);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', option);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const renderItem = (selectedTab: ArtistInformation) => {
    switch (selectedTab) {
      case ArtistInformation.transfers:
        return <Transfers />;

      case ArtistInformation.packaging:
        return <Packaging />;
    }
  };

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedTab(tab as ArtistInformation);
    }
  }, []);

  return (
    <div className={style.forArtist}>
      <h1 className={style.title}>Information</h1>
      <div className={style.tabs}>
        <div className={style.container}>
          {tabs.map(({ option }) => (
            <div
              key={option}
              className={option === selectedTab ? style.isActive : style.tab}
              onClick={() => handleSetSelectedTab(option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className={style.tabsFooter} />
      </div>
      {renderItem(selectedTab)}
    </div>
  );
};

export default ForArtist;
