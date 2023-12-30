'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { AddIcon } from '@/app/icons/icon-add';
import { ArtStylesIcon } from '@/app/icons/icon-art-styles';
import { MapPointIcon } from '@/app/icons/icon-map-point';
import { Artist } from '@/types/Artist';
import { Statuses } from '@/types/Profile';

import style from './artistInfo.module.scss';

type Props = {
  artistInfo: Artist;
  isProfile?: boolean;
  statuses?: Statuses | null;
};

const ArtistInfo: FC<Props> = ({ isProfile = false, artistInfo, statuses }) => {
  const { fullName, country, city, aboutMe, imageUrl, styles, isDeactivated } = artistInfo;
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');

    if (tab === 'Payment' || tab === 'Delivery') {
      const middleOfPage = document.documentElement.scrollHeight * 0.3;

      window.scrollTo({
        top: middleOfPage,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className={style.author}>
      {isProfile && (
        <div className={style.titleContainer}>
          <h2 className={style.title}>Artist Profile</h2>
        </div>
      )}

      {isProfile && statuses && (
        <div className={style.subtitleContainer}>
          {!statuses.hasStripeProfile && !statuses.hasAddress && (
            <>
              <span className={style.subtitle}>To showcase and sell your paintings you need to create a </span>
              <a href="/profile?tab=Payment" className={style.subtitleLink}>
                Stripe account
              </a>
              <span className={style.subtitle}> and fill in </span>
              <a href="/profile?tab=Delivery" className={style.subtitleLink}>
                address data
              </a>
            </>
          )}

          {!statuses.hasStripeProfile && statuses.hasAddress && (
            <>
              <span className={style.subtitle}>To showcase and sell your paintings you need to create a </span>
              <a href="/profile?tab=Payment" className={style.subtitleLink}>
                Stripe account{' '}
              </a>
            </>
          )}

          {statuses.hasStripeProfile && !statuses.hasAddress && (
            <>
              <span className={style.subtitle}>
                To showcase and sell your paintings you need to fill in the{' '}
              </span>
              <a href="/profile?tab=Delivery" className={style.subtitleLink}>
                address data
              </a>
            </>
          )}
        </div>
      )}

      <div className={style.container}>
        <div className={style.author__photo}>
          <Image className={style.image} src={imageUrl} alt="author" width={1000} height={1000} />

          {isDeactivated && (
            <div className={style.deactivated}>
              Profile is in deactivate mode
            </div>
          )}
        </div>

        <div className={style.author__info}>
          <div className={style.author__name}>{fullName}</div>

          <div className={style.author__styles}>
            <ArtStylesIcon />

            {styles.map((artistStyle: string, index: number) => (
              <span className={style.style} key={index}>
                <span className={style.style__mobile}>
                  {index === styles.length - 1 ? artistStyle : artistStyle + ','}
                </span>

                <span className={style.style__laptop}>
                  {index === styles.length - 1 ? artistStyle : artistStyle + ','}
                </span>
              </span>
            ))}
          </div>

          <div className={style.author__location}>
            <MapPointIcon />
            {`${country}, ${city}`}
          </div>
          <div className={style.author__about}>{aboutMe}</div>

          {isProfile && (
            <div className={style.button__container}>
              <Link className={style.button__add} href="/profile/create-painting">
                <AddIcon className={style.button__icon} />
                Add Arts
              </Link>
              <Link className={style.button__edit} href="/profile/edit-profile">
                Edit profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
