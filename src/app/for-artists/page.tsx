'use client';

import { useState } from 'react';
import Transfers from './transfers/transfers';
import Packaging from './packaging/packaging';

import style from './page.module.scss';

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

  const handleSetSelectedTab = (option: ArtistInformation) => {
    setSelectedTab(option);
  };

  const renderItem = (selectedTab: ArtistInformation) => {
    switch (selectedTab) {
      case ArtistInformation.transfers:
        return <Transfers />;

      case ArtistInformation.packaging:
        return <Packaging />;
    }
  };

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
