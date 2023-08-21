import { getArtists } from "@/utils/api";
import ArtistsList from "./artistsList/artistsList";
import Preloader from "./preloader";
import { ArtistsCollection } from "@/types/Artist";

const Artists = async () => {
  const artistsList: ArtistsCollection = await getArtists();

  return (
    <>
      <Preloader artistsList={artistsList} />
      <ArtistsList />
    </>
  );
};

export default Artists;
