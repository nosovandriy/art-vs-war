import { getArtist, getPaintingsByArtist } from "@/utils/api";
import ArtistPreloader from "./artist-preloader";
import ArtistInfo from "./artistInfo/artistInfo";
import ArtistTabs from "./artistTabs/artistTabs";

import style from "./page.module.scss";

const Artist = async ({ params }: { params: { slug: string } }) => {
  const artistData = getArtist(params.slug);
  const paintingsData = getPaintingsByArtist(params.slug);

  const [artistInfo, paintingsList] = await Promise.all([
    artistData,
    paintingsData,
  ]);

  return (
    <section className={style.artist}>
      <ArtistPreloader paintingsList={paintingsList} artistId={params.slug} />
      <ArtistInfo artistInfo={artistInfo} />
      <ArtistTabs />
    </section>
  );
};

export default Artist;

