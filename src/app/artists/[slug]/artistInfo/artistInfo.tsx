import { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";

import style from "./artistInfo.module.scss";
import { MapPoint } from "@/app/icons/icon-map-point";
import { Add } from "@/app/icons/icon-add";
import { Artist } from "@/types/Artist";
import { ArtistTabOptions } from "@/types/ArtistTabOptions";

type Props = {
  artistInfo: Artist;
  isProfile?: boolean;
  setOpenForm?: Dispatch<SetStateAction<ArtistTabOptions | null>>;
};

const ArtistInfo: FC<Props> = ({
  artistInfo,
  setOpenForm,
  isProfile = false,
}) => {
  const {
    fullName,
    country,
    city,
    aboutMe,
    imageUrl,
    styles = ['Contemporary', 'Abstract'],
  } = artistInfo;

  return (
    <div className={style.author}>
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
          <div className={style.author__name}>
            {fullName}
          </div>

          <div className={style.author__styles}>
            <span className={style.style__title}>Styles: </span>
            {styles.map((artistStyle: string, index: number) => (
              <span className={style.style} key={index}>
                <span className={style.style__mobile}>
                  {artistStyle}
                  {index !== styles.length - 1 && ", "}
                </span>

                <span className={style.style__laptop}>
                  {artistStyle}
                </span>
              </span>
            ))}
          </div>

          <div className={style.author__location}>
            <MapPoint />
            {`${country}, ${city}`}
          </div>
          <div className={style.author__about}>{aboutMe}</div>

          {(isProfile && setOpenForm) && (
            <>
              <button
                className={style.button__edit}
                type="button"
                onClick={() => setOpenForm(ArtistTabOptions.profile)}
              >
                Edit profile
              </button>
              <button
                className={style.button__add}
                type="button"
                onClick={() => setOpenForm(ArtistTabOptions.artworks)}
              >
                <Add className={style.button__icon} />
                Add Arts
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
