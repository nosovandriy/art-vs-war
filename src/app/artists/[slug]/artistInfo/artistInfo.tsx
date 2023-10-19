import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { AddIcon } from "@/app/icons/icon-add";
import { ArtStylesIcon } from "@/app/icons/icon-art-styles";
import { MapPointIcon } from "@/app/icons/icon-map-point";
import { Artist } from "@/types/Artist";

import style from "./artistInfo.module.scss";

type Props = {
  artistInfo: Artist;
  isProfile?: boolean;
};

const ArtistInfo: FC<Props> = ({ isProfile = false, artistInfo }) => {
  const { fullName, country, city, aboutMe, imageUrl, styles } = artistInfo;

  return (
    <div className={style.author}>
      {isProfile && (
        <div className={style.titleContainer}>
          <h2 className={style.title}>Artist Profile</h2>
        </div>
      )}

      <div className={style.container}>
        <div className={style.author__photo}>
          <Image
            className={style.image}
            src={imageUrl}
            alt="author"
            width={1000}
            height={1000}
          />
        </div>

        <div className={style.author__info}>
          <div className={style.author__name}>{fullName}</div>

          <div className={style.author__styles}>
            <ArtStylesIcon />

            {styles.map((artistStyle: string, index: number) => (
              <span className={style.style} key={index}>
                <span className={style.style__mobile}>{artistStyle}</span>

                <span className={style.style__laptop}>{artistStyle}</span>
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
              <Link
                className={style.button__add}
                href="/profile/create-painting"
              >
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
