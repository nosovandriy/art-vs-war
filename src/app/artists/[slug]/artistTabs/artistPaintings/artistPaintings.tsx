import { useAppSelector } from "@/types/ReduxHooks";
import MasonryGallery from "@/app/components/masonry/masonry";
import MoreArtistPaintingsAutoFetch from "../more-artist-paintings-auto-fetch/more-artist-paintings-auto-fetch.tsx";

const ArtistPaintings = () => {
  const { artistPaintings } = useAppSelector((state) => state.artistPaintings);

  return (
    <>
      <MasonryGallery paintingsList={artistPaintings} />
      <MoreArtistPaintingsAutoFetch />
    </>
  )
};

export default ArtistPaintings;
