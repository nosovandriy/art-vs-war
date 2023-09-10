"use client";

import { motion } from "framer-motion";

import { Artist } from "@/types/Artist";
import { useAppSelector } from "@/types/ReduxHooks";
import { TitleAnimation } from "@/utils/animation";
import ArtistCard from "../artistCard/artistCard";
import EmptyArtistsPage from "./empty-page/empty-page";
import InputArtistSearch from "./inputSearch/inputSearch";
import MoreArtistsAutoFetch from "./more-artists-auto-fetch/more-artists-auto-fetch";

import style from "./artistsList.module.scss";

const ArtistsList = () => {
  const { foundArtists, totalSize } = useAppSelector((state) => state.artists);

  return (
    <section className={style.artists}>
      <div className={style.inputWrapper}>
        <div className={style.titleWrapper}>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={TitleAnimation("x")}
            className={style.title}
          >
            Artists
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={TitleAnimation("y", 0.5)}
            className={style.title__info}
          >
            &nbsp;{`${totalSize}`}
          </motion.p>
        </div>

        <InputArtistSearch />
      </div>

      <>
        {foundArtists.length !== 0 ? (
          <>
            <div className={style.artistsCards}>
              {foundArtists.map((artist: Artist, index: number) => (
                <ArtistCard
                  artist={artist}
                  key={artist.cognitoSubject}
                  className={
                    index % 2 === 0
                      ? `${style.artistsCardOdd}`
                      : `${style.artistsCardEven}`
                  }
                />
              ))}
            </div>
            <MoreArtistsAutoFetch />
          </>
        ) : (
          <EmptyArtistsPage />
        )}
      </>
    </section>
  );
};

export default ArtistsList;
