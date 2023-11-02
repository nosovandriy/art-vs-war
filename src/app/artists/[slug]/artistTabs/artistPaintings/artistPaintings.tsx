import { useAppSelector } from "@/types/ReduxHooks";
import MasonryGallery from "@/app/components/masonry/masonry";
import MoreArtistPaintingsAutoFetch from "../more-artist-paintings-auto-fetch/more-artist-paintings-auto-fetch.tsx";
import Collection from "@/app/components/collection/collection";

const ArtistPaintings = () => {
  const { artistPaintings } = useAppSelector((state) => state.artistPaintings);

  return (
    artistPaintings.length
    ? (
      <>
        <MasonryGallery paintingsList={artistPaintings} />
        <MoreArtistPaintingsAutoFetch />
      </>
    ) : (
      <Collection isArtsTab title="There are no paintings created yet" />
    )
  )
};

export default ArtistPaintings;
