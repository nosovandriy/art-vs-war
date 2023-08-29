"use client";

import { Artist } from "@/types/Artist";
import { useAppSelector } from "@/types/ReduxHooks";
import ArtistCard from "../artistCard/artistCard";
import InputArtistSearch from "./inputSearch/inputSearch";
import MoreArtistsButton from "./more-artists-button/more-artists-button";

import style from "./artistsList.module.scss";
import EmptyArtistsPage from "./empty-page/empty-page";

const ArtistsList = () => {
  const { foundArtists } = useAppSelector((state) => state.artists);

  return (
    <section className={style.artists}>
      <div className={style.inputWrapper}>
        <h1 className={style.title}>Artists</h1>
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
            <MoreArtistsButton />
          </>
        ) : (
          <EmptyArtistsPage />
        )}
      </>
    </section>
  );
};

export default ArtistsList;
