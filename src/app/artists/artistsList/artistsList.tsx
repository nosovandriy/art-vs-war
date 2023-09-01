"use client";

import { Artist } from "@/types/Artist";
import { useAppSelector } from "@/types/ReduxHooks";
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
          <h1 className={style.title}>Artists</h1>
          <p className={style.title__info}>&nbsp;{`(${totalSize})`}</p>
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
