import { ArtistsCollection } from "@/types/Artist";
import { getArtists } from "@/utils/api";
import { Metadata } from "next";
import ArtistsList from "./artistsList/artistsList";
import Preloader from "./preloader";

export const metadata: Metadata = {
  title: "Artists",
  description: "List of artists in Art vs War GALLERY",
};

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
